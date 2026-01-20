"use client";

import { useState, useRef, useEffect } from "react";
import { Review, ReviewFormData } from "@/types/review";
import api from "@/lib/api";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface ReviewFormProps {
  review?: Review; // 수정 모드일 때 기존 리뷰 데이터
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ReviewForm({
  review,
  userId,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ReviewFormData>({
    name: review?.name || "",
    content: review?.content || "",
    rating: review?.rating || 5,
    before_image: null,
    after_image: null,
  });

  const [beforePreview, setBeforePreview] = useState<string | null>(
    review?.before_image_url || null
  );
  const [afterPreview, setAfterPreview] = useState<string | null>(
    review?.after_image_url || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userPhone, setUserPhone] = useState<string>("");

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  // 사용자 전화번호 가져오기
  useEffect(() => {
    const fetchUserPhone = async () => {
      try {
        const response = await api.get("/users/me");
        const phone = response.data.phone || response.data.phoneNumber || response.data.telephone || "";
        setUserPhone(phone);
      } catch (error) {
        console.error("전화번호 가져오기 실패:", error);
        // 실패해도 계속 진행 (phone 없이 파일명 생성)
      }
    };

    if (user) {
      fetchUserPhone();
    }
  }, [user]);

  // 파일명 정리 함수 (Supabase Storage 허용 문자만 사용)
  // Supabase Storage는 한글을 지원하지 않으므로 영문, 숫자, 언더스코어만 사용
  const sanitizeFileName = (name: string): string => {
    // 허용되는 문자만 사용: A-Z, a-z, 0-9, 언더스코어(_), 하이픈(-), 점(.)
    // 한글 및 특수문자는 제거
    let sanitized = name.replace(/[^a-zA-Z0-9_-]/g, "");
    
    // 영문/숫자가 없으면 기본값 사용
    if (!sanitized || sanitized.length === 0) {
      sanitized = "user";
    }
    
    // 최대 길이 제한 (너무 긴 파일명 방지)
    if (sanitized.length > 50) {
      sanitized = sanitized.substring(0, 50);
    }
    
    return sanitized.toLowerCase(); // 소문자로 통일
  };

  // 파일명 생성 함수
  // 파일명(폴더명): sanitized_user.name + phone (영문/숫자만)
  // 이미지명: sanitized_name + before/after + timestamp
  const generateFileName = (type: "before" | "after", originalFileName: string): string => {
    // 사용자 이름 (영문/숫자로 정리, 한글 제거)
    const userName = sanitizeFileName(formData.name || user?.name || "user");
    
    // 전화번호 (숫자만)
    const phone = userPhone.replace(/[^0-9]/g, "") || "";
    
    // 타임스탬프 추가로 고유성 보장 및 충돌 방지
    const timestamp = Date.now();
    
    // 파일 확장자 추출
    const fileExtension = originalFileName.split('.').pop()?.toLowerCase() || 'jpg';
    
    // 파일명(폴더명): sanitized_name + phone (예: "user01012345678")
    // 전화번호가 없으면 user + timestamp 사용
    const folderName = phone ? `${userName}${phone}` : `${userName}${timestamp}`;
    
    // 이미지명: sanitized_name + type + timestamp.확장자 
    // (예: "user_before_1703123456789.jpg")
    const imageName = `${userName}_${type}_${timestamp}.${fileExtension}`;
    
    // 전체 경로: folderName/imageName
    const fullPath = `${folderName}/${imageName}`;
    
    console.log(`파일명 생성: ${fullPath} (폴더: ${folderName}, 이미지: ${imageName})`);
    console.log(`원본 이름: ${formData.name || user?.name || "user"}`);
    
    return fullPath;
  };

  // Supabase Storage에 이미지 업로드
  const uploadImageToSupabase = async (
    file: File,
    type: "before" | "after"
  ): Promise<string> => {
    try {
      // Supabase 설정 확인
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.");
      }

      const fileName = generateFileName(type, file.name);
      
      console.log(`이미지 업로드 시작:`, {
        fileName,
        fileSize: file.size,
        fileType: file.type,
        originalName: file.name
      });
      
      // 파일 크기 확인 (50MB 제한)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        throw new Error(`파일 크기가 너무 큽니다. 최대 50MB까지 업로드 가능합니다. (현재: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      }

      const { data, error } = await supabase.storage
        .from("review-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true, // 같은 파일명이면 덮어쓰기 허용
        });

      if (error) {
        console.error("Supabase 업로드 에러 상세:", {
          error,
          message: error.message,
          errorDetails: error,
          fileName
        });
        
        // 에러 타입별 메시지 개선
        let errorMessage = `이미지 업로드 실패: ${error.message}`;
        
        if (error.message?.includes("Invalid key")) {
          errorMessage = `파일명이 유효하지 않습니다. 한글은 자동으로 영문으로 변환됩니다. (파일명: ${fileName})`;
        } else if (error.message?.includes("new row violates row-level security policy")) {
          errorMessage = `Storage 권한 오류입니다. Supabase Dashboard에서 Storage 정책을 확인하세요.`;
        } else if (error.message?.includes("Bucket not found")) {
          errorMessage = `'review-images' 버킷이 존재하지 않습니다. Supabase Dashboard에서 버킷을 생성하세요.`;
        } else if (error.message?.includes("Unauthorized") || error.message?.includes("Forbidden")) {
          errorMessage = `Storage 접근 권한이 없습니다. Supabase Storage 정책을 확인하세요.`;
        }
        
        throw new Error(errorMessage);
      }

      if (!data) {
        throw new Error("업로드는 성공했지만 데이터를 받지 못했습니다.");
      }

      console.log("업로드 성공 데이터:", data);

      // Public URL 생성
      const { data: urlData } = supabase.storage
        .from("review-images")
        .getPublicUrl(fileName);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Public URL을 생성할 수 없습니다.");
      }

      const imageUrl = urlData.publicUrl;
      console.log(`이미지 업로드 성공: ${imageUrl}`);
      
      return imageUrl;
    } catch (error: any) {
      console.error("이미지 업로드 실패 상세:", {
        error,
        message: error?.message,
        stack: error?.stack
      });
      
      // 에러 메시지가 이미 개선되어 있으면 그대로 사용
      if (error?.message && error.message.includes("이미지 업로드 실패")) {
        throw error;
      }
      
      // 그 외의 경우 일반적인 에러 메시지
      throw new Error(error?.message || "이미지 업로드 중 알 수 없는 오류가 발생했습니다.");
    }
  };

  // 이미지 선택 핸들러
  const handleImageSelect = (
    file: File | null,
    type: "before" | "after"
  ) => {
    if (file) {
      if (type === "before") {
        setFormData({ ...formData, before_image: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setBeforePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFormData({ ...formData, after_image: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setAfterPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };


  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    // 이미지 검사 (새로 작성하는 경우 또는 수정 시 이미지 변경하는 경우)
    if (!review) {
      // 새로 작성하는 경우 - 이미지 필수
      if (!formData.before_image || !formData.after_image) {
        alert("시술 전/후 이미지를 모두 업로드해주세요.");
        return;
      }
    } else {
      // 수정하는 경우 - 기존 이미지가 없고 새 이미지도 없으면 에러
      if (
        !beforePreview &&
        !formData.before_image &&
        !review.before_image_url
      ) {
        alert("시술 전 이미지를 업로드해주세요.");
        return;
      }
      if (
        !afterPreview &&
        !formData.after_image &&
        !review.after_image_url
      ) {
        alert("시술 후 이미지를 업로드해주세요.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // 리뷰 데이터 저장 (백엔드 API 사용)
      if (review) {
        // 수정 모드 - 이미지 파일이 있으면 FormData, 없으면 JSON
        const hasNewImages = formData.before_image || formData.after_image;
        
        if (hasNewImages) {
          // 이미지 파일이 있으면 Supabase에 업로드 후 JSON으로 전송
          setIsUploading(true);
          
          let beforeImageUrl = review.before_image_url || "";
          let afterImageUrl = review.after_image_url || "";
          
          // 새 이미지가 있으면 Supabase에 업로드
          if (formData.before_image) {
            try {
              beforeImageUrl = await uploadImageToSupabase(formData.before_image, "before");
              console.log("시술 전 이미지 업로드 완료:", beforeImageUrl);
            } catch (error: any) {
              console.error("시술 전 이미지 업로드 실패:", error);
              throw new Error(`시술 전 이미지 업로드 실패: ${error.message}`);
            }
          }
          
          if (formData.after_image) {
            try {
              afterImageUrl = await uploadImageToSupabase(formData.after_image, "after");
              console.log("시술 후 이미지 업로드 완료:", afterImageUrl);
            } catch (error: any) {
              console.error("시술 후 이미지 업로드 실패:", error);
              throw new Error(`시술 후 이미지 업로드 실패: ${error.message}`);
            }
          }
          
          // 이미지 URL과 함께 리뷰 데이터 업데이트
          const updateData = {
            name: formData.name,
            content: formData.content,
            rating: formData.rating,
            before_image_url: beforeImageUrl,
            after_image_url: afterImageUrl,
          };
          
          await api.put(`/reviews/${review.id}/with-urls`, updateData);
        } else {
          // 이미지 파일이 없으면 JSON으로 전송 (기존 URL 유지)
          const updateData: any = {
            name: formData.name,
            content: formData.content,
            rating: formData.rating,
          };

          // 기존 이미지 URL 유지
          if (review.before_image_url) {
            updateData.before_image_url = review.before_image_url;
          }
          if (review.after_image_url) {
            updateData.after_image_url = review.after_image_url;
          }

          await api.put(`/reviews/${review.id}/with-urls`, updateData);
        }
      } else {
        // 새로 작성 모드
        setIsUploading(true);
        
        let beforeImageUrl = "";
        let afterImageUrl = "";
        
        // Supabase Storage에 이미지 업로드
        if (formData.before_image) {
          try {
            console.log("시술 전 이미지 업로드 시작...");
            beforeImageUrl = await uploadImageToSupabase(formData.before_image, "before");
            console.log("시술 전 이미지 업로드 완료:", beforeImageUrl);
            
            // URL 유효성 검사
            if (!beforeImageUrl || !beforeImageUrl.startsWith('http')) {
              throw new Error("시술 전 이미지 URL을 받지 못했습니다.");
            }
          } catch (error: any) {
            console.error("시술 전 이미지 업로드 실패:", error);
            setIsUploading(false);
            throw new Error(`시술 전 이미지 업로드 실패: ${error.message}`);
          }
        } else {
          setIsUploading(false);
          throw new Error("시술 전 이미지를 선택해주세요.");
        }
        
        if (formData.after_image) {
          try {
            console.log("시술 후 이미지 업로드 시작...");
            afterImageUrl = await uploadImageToSupabase(formData.after_image, "after");
            console.log("시술 후 이미지 업로드 완료:", afterImageUrl);
            
            // URL 유효성 검사
            if (!afterImageUrl || !afterImageUrl.startsWith('http')) {
              throw new Error("시술 후 이미지 URL을 받지 못했습니다.");
            }
          } catch (error: any) {
            console.error("시술 후 이미지 업로드 실패:", error);
            setIsUploading(false);
            throw new Error(`시술 후 이미지 업로드 실패: ${error.message}`);
          }
        } else {
          setIsUploading(false);
          throw new Error("시술 후 이미지를 선택해주세요.");
        }
        
        // 이미지 업로드 완료 확인
        if (!beforeImageUrl || !afterImageUrl) {
          setIsUploading(false);
          throw new Error("이미지 업로드가 완료되지 않았습니다. 다시 시도해주세요.");
        }
        
        console.log("모든 이미지 업로드 완료. 리뷰 데이터 저장 시작...");
        
        // 백엔드가 FormData를 기대하므로 FormData로 전송
        // 하지만 이미 Supabase에 업로드했으므로, 백엔드에 URL 정보도 함께 전송
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('rating', String(formData.rating));
        
        // 원본 파일을 FormData에 추가 (백엔드가 파일을 기대하는 경우)
        if (formData.before_image) {
          formDataToSend.append('before_image', formData.before_image);
        }
        if (formData.after_image) {
          formDataToSend.append('after_image', formData.after_image);
        }
        
        // Supabase에 업로드된 URL도 함께 전송 (백엔드가 URL을 사용하는 경우)
        formDataToSend.append('before_image_url', beforeImageUrl);
        formDataToSend.append('after_image_url', afterImageUrl);
        
        console.log("전송할 리뷰 데이터:", {
          name: formData.name,
          content: formData.content,
          rating: formData.rating,
          before_image: formData.before_image?.name,
          after_image: formData.after_image?.name,
          before_image_url: beforeImageUrl,
          after_image_url: afterImageUrl,
        });
        
        // FormData로 리뷰 데이터 저장
        try {
          const response = await api.post('/reviews', formDataToSend);
          console.log("리뷰 저장 성공:", response.data);
        } catch (error: any) {
          console.error("리뷰 저장 실패:", error);
          throw error; // 에러를 다시 throw하여 catch 블록에서 처리
        }
      }

      // 모든 작업 완료
      console.log("리뷰 작성/수정 완료!");
      onSuccess();
    } catch (error: any) {
      console.error("리뷰 저장 실패:", error);
      console.error("에러 응답 전체:", error.response);
      console.error("에러 응답 데이터:", error.response?.data);
      console.error("에러 상태 코드:", error.response?.status);
      console.error("에러 요청 설정:", error.config);
      
      // 상세한 에러 메시지 추출
      let errorMessage = "리뷰 저장에 실패했습니다.";
      
      // Supabase 스키마 오류 감지 함수
      const detectSchemaError = (msg: string): string | null => {
        if (!msg) return null;
        const msgLower = msg.toLowerCase();
        if (msgLower.includes("could not find") && msgLower.includes("column") && (msgLower.includes("schema cache") || msgLower.includes("schema"))) {
          const columnMatch = msg.match(/the '(\w+)' column/i);
          const columnName = columnMatch ? columnMatch[1] : '컬럼';
          
          return `리뷰 저장에 실패했습니다.\n\n데이터베이스에 '${columnName}' 컬럼이 없습니다.\n\n해결 방법:\n1. Supabase Dashboard → SQL Editor를 엽니다.\n2. 'add-name-and-email-columns.sql' 파일의 SQL을 실행하세요.\n3. 또는 'supabase-schema.sql' 파일의 전체 스키마를 확인하세요.\n\n원본 오류: ${msg}`;
        }
        return null;
      };
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // 에러 메시지 추출
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
        
        // Supabase 스키마 오류를 먼저 감지 (우선 처리)
        const schemaError = detectSchemaError(errorMessage);
        if (schemaError) {
          errorMessage = schemaError;
        } else {
          // 스키마 오류가 아니면 일반 에러 처리
          // 필드별 에러가 있으면 표시
          if (errorData.details) {
            const details = errorData.details;
            if (Array.isArray(details)) {
              // 배열 형태의 에러 (예: ["별점은 5 이하여야 합니다", "별점은 1 이상이어야 합니다"])
              const errorList = details.join('\n');
              errorMessage = `${errorMessage}\n\n${errorList}`;
            } else if (typeof details === 'object') {
              // 객체 형태의 에러
              const fieldErrors = Object.entries(details)
                .map(([field, reason]) => `${field}: ${reason}`)
                .join('\n');
              errorMessage = `${errorMessage}\n\n${fieldErrors}`;
            } else if (typeof details === 'string') {
              errorMessage = `${errorMessage}\n\n${details}`;
            }
          }
          
          // validation 오류가 있는 경우
          if (errorData.validation) {
            const validationErrors = Object.entries(errorData.validation)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('\n');
            errorMessage = `${errorMessage}\n\n${validationErrors}`;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
        
        // Supabase 스키마 오류 감지
        const schemaError = detectSchemaError(errorMessage);
        if (schemaError) {
          errorMessage = schemaError;
        }
      }
      
      console.error("최종 에러 메시지:", errorMessage);
      
      // 에러 메시지를 사용자에게 표시
      alert(errorMessage);
      
      // 업로드 중 에러인 경우 상태 초기화하지 않음 (재시도 가능하도록)
      // 하지만 일반 에러는 상태 초기화
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#2d2d2d] mb-6">
        {review ? "리뷰 수정" : "리뷰 작성"}
      </h2>

      {/* 이름 입력 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이름 *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e3ba75] focus:border-transparent"
          required
        />
      </div>

      {/* 별점 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          별점 *
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${
                  star <= formData.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                } transition-colors`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 리뷰 내용 입력 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          리뷰 내용 *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e3ba75] focus:border-transparent"
          required
        />
      </div>

      {/* 시술 전 이미지 업로드 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          시술 전 이미지 * {!review && "(필수)"}
          {formData.before_image && (
            <span className="ml-2 text-green-600 text-xs">✓ 선택됨</span>
          )}
        </label>
        <input
          ref={beforeInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageSelect(
              e.target.files?.[0] || null,
              "before"
            )
          }
          className="hidden"
          disabled={isUploading || isSubmitting}
        />
        <div className="flex items-center space-x-4">
          {beforePreview && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
              <Image
                src={beforePreview}
                alt="시술 전 미리보기"
                fill
                className="object-cover"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => beforeInputRef.current?.click()}
            disabled={isUploading || isSubmitting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formData.before_image ? "이미지 변경" : "이미지 선택"}
          </button>
          {formData.before_image && (
            <span className="text-sm text-gray-600">
              {formData.before_image.name}
            </span>
          )}
        </div>
      </div>

      {/* 시술 후 이미지 업로드 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          시술 후 이미지 * {!review && "(필수)"}
          {formData.after_image && (
            <span className="ml-2 text-green-600 text-xs">✓ 선택됨</span>
          )}
        </label>
        <input
          ref={afterInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageSelect(e.target.files?.[0] || null, "after")
          }
          className="hidden"
          disabled={isUploading || isSubmitting}
        />
        <div className="flex items-center space-x-4">
          {afterPreview && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
              <Image
                src={afterPreview}
                alt="시술 후 미리보기"
                fill
                className="object-cover"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => afterInputRef.current?.click()}
            disabled={isUploading || isSubmitting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formData.after_image ? "이미지 변경" : "이미지 선택"}
          </button>
          {formData.after_image && (
            <span className="text-sm text-gray-600">
              {formData.after_image.name}
            </span>
          )}
        </div>
      </div>

      {/* 의료 고지 문구 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          ※ 해당 후기는 개인의 경험을 바탕으로 작성되었으며, 치료 효과에는
          개인차가 있을 수 있습니다.
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="flex-1 px-6 py-3 bg-[#e3ba75] text-[#2d2d2d] font-semibold rounded-md hover:bg-[#d4a865] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading
            ? "이미지 업로드 중..."
            : isSubmitting
            ? "저장 중..."
            : review
            ? "수정하기"
            : "작성하기"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || isUploading}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          취소
        </button>
      </div>
    </form>
  );
}
