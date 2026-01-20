"use client";

import { useState, useRef } from "react";
import { Review, ReviewFormData } from "@/types/review";
import api from "@/lib/api";
import Image from "next/image";

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

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

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
          // 이미지 파일이 있으면 FormData로 전송
          const formDataToSend = new FormData();
          formDataToSend.append('name', formData.name);
          formDataToSend.append('content', formData.content);
          // 백엔드가 숫자를 기대하므로 숫자로 변환하여 전송
          formDataToSend.append('rating', String(Number(formData.rating)));
          
          if (formData.before_image) {
            formDataToSend.append('before_image', formData.before_image);
          } else if (review.before_image_url) {
            formDataToSend.append('before_image_url', review.before_image_url);
          }
          
          if (formData.after_image) {
            formDataToSend.append('after_image', formData.after_image);
          } else if (review.after_image_url) {
            formDataToSend.append('after_image_url', review.after_image_url);
          }

          // FormData 전송 시 Content-Type은 자동 설정
          await api.put(`/reviews/${review.id}`, formDataToSend);
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
        // 새로 작성 모드 - FormData로 전송 (이미지 파일 포함)
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('content', formData.content);
        // 백엔드가 숫자를 기대하므로 숫자로 변환하여 전송
        // FormData는 문자열로 변환되지만, 백엔드에서 파싱할 수 있도록 숫자 문자열로 전송
        formDataToSend.append('rating', String(Number(formData.rating)));
        
        if (formData.before_image) {
          formDataToSend.append('before_image', formData.before_image);
        }
        if (formData.after_image) {
          formDataToSend.append('after_image', formData.after_image);
        }

        // FormData 전송 시 Content-Type은 자동 설정 (boundary 포함)
        // 명시적으로 설정하면 boundary가 없어서 오류 발생 가능
        await api.post('/reviews', formDataToSend);
      }

      onSuccess();
    } catch (error: any) {
      console.error("리뷰 저장 실패:", error);
      console.error("에러 응답:", error.response?.data);
      console.error("에러 상태:", error.response?.status);
      
      // 상세한 에러 메시지 추출
      let errorMessage = "리뷰 저장에 실패했습니다.";
      
      if (error.response?.data) {
        const errorData = error.response.data;
        errorMessage = errorData.message || errorData.error || errorMessage;
        
        // 필드별 에러가 있으면 표시
        if (errorData.details) {
          const details = errorData.details;
          if (typeof details === 'object') {
            const fieldErrors = Object.entries(details)
              .map(([field, reason]) => `${field}: ${reason}`)
              .join('\n');
            errorMessage = `${errorMessage}\n\n${fieldErrors}`;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
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
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            이미지 선택
          </button>
        </div>
      </div>

      {/* 시술 후 이미지 업로드 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          시술 후 이미지 * {!review && "(필수)"}
        </label>
        <input
          ref={afterInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageSelect(e.target.files?.[0] || null, "after")
          }
          className="hidden"
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
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            이미지 선택
          </button>
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
          {isSubmitting || isUploading
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
