"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Review } from "@/types/review";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import Toast from "@/components/Toast";
import { approveReview } from "@/lib/review-api";

export default function ReviewPage() {
  const { user: authUser, isAdmin } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // 사용자 확인 및 리뷰 목록 로드
  useEffect(() => {
    checkUser();
    loadReviews();
  }, [authUser]); // authUser 변경 시 재확인

  // 사용자 확인 (JWT 토큰 기반)
  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      console.log("사용자 확인 시작:", { token: !!token, storedUser: !!storedUser, authUser });

      // 토큰이 없으면 로그인 안 된 것으로 간주
      if (!token) {
        console.log("토큰이 없습니다. 로그아웃 상태로 설정");
        setCurrentUser(null);
        return;
      }

      // 1. localStorage의 user 정보 먼저 확인 (빠른 응답)
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("localStorage 사용자 정보:", userData);
          
          // id가 없으면 토큰에서 추출 시도
          if (!userData.id && token) {
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              userData.id = payload.sub || payload.userId || payload.id;
              console.log("토큰에서 ID 추출:", userData.id);
              localStorage.setItem("user", JSON.stringify(userData));
            } catch (e) {
              console.error("토큰 파싱 실패:", e);
            }
          }
          
          // id가 있으면 일단 사용자로 설정 (API 호출 전에)
          if (userData.id) {
            setCurrentUser(userData);
            console.log("localStorage에서 사용자 설정 완료:", userData);
          }
        } catch (e) {
          console.error("사용자 정보 파싱 실패:", e);
        }
      }

      // 2. 백엔드 API로 사용자 정보 가져오기 (최신 정보)
      try {
        const response = await api.get("/users/me");
        const userData = { id: response.data.id, ...response.data };
        console.log("API에서 사용자 정보 가져옴:", userData);
        setCurrentUser(userData);
        // localStorage에도 저장 (id 포함)
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (apiError: any) {
        console.error("API 사용자 확인 실패:", apiError);
        // API 실패해도 localStorage에 사용자 정보가 있으면 사용
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            if (!userData.id && token) {
              try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                userData.id = payload.sub || payload.userId || payload.id;
                localStorage.setItem("user", JSON.stringify(userData));
              } catch (e) {
                console.error("토큰 파싱 실패:", e);
              }
            }
            if (userData.id) {
              setCurrentUser(userData);
              console.log("API 실패 후 localStorage 사용자 설정:", userData);
            } else {
              console.log("사용자 ID를 찾을 수 없습니다");
              setCurrentUser(null);
            }
          } catch (e) {
            console.error("사용자 정보 파싱 실패:", e);
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      }
    } catch (error) {
      console.error("사용자 확인 실패:", error);
      setCurrentUser(null);
    }
  };

  // 리뷰 목록 로드 (백엔드 API 사용)
  // admin은 모든 리뷰, 일반 사용자는 승인된 리뷰만
  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get("/reviews", {
        params: {
          is_approved: isAdmin ? undefined : true, // admin은 모든 리뷰, 일반 사용자는 승인된 리뷰만
          order: "created_at.desc",
        },
      });

      const loadedReviews = response.data.data || response.data || [];
      
      // 일반 사용자는 승인된 리뷰만 필터링 (백엔드에서 필터링 안 할 경우 대비)
      const filteredReviews = isAdmin 
        ? loadedReviews 
        : loadedReviews.filter((review: Review) => review.is_approved);
      
      setReviews(filteredReviews);
    } catch (error: any) {
      console.error("리뷰 로드 실패:", error);
      showToast(
        error.response?.data?.message || error.message || "리뷰를 불러오는데 실패했습니다.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // 토스트 표시
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ message, type, isVisible: true });
  };

  // 토스트 닫기
  const closeToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  // 리뷰 작성 폼 표시
  const handleWriteReview = () => {
    console.log("리뷰 작성 버튼 클릭:", { currentUser, token: !!localStorage.getItem("token") });
    
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("리뷰를 작성하려면 로그인이 필요합니다.", "info");
      return;
    }

    // currentUser가 없어도 토큰이 있으면 사용자 정보 다시 확인
    if (!currentUser) {
      console.log("currentUser가 없지만 토큰이 있음. 사용자 정보 다시 확인");
      checkUser().then(() => {
        // 사용자 정보 확인 후 다시 시도
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            if (userData.id) {
              setCurrentUser(userData);
              setEditingReview(null);
              setShowForm(true);
              return;
            }
          } catch (e) {
            console.error("사용자 정보 파싱 실패:", e);
          }
        }
        showToast("사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.", "error");
      });
      return;
    }

    setEditingReview(null);
    setShowForm(true);
  };

  // 리뷰 수정
  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  // 리뷰 삭제 (백엔드 API 사용)
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("정말 이 리뷰를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await api.delete(`/reviews/${reviewId}`);
      showToast("리뷰가 삭제되었습니다.", "success");
      loadReviews();
    } catch (error: any) {
      console.error("리뷰 삭제 실패:", error);
      showToast(
        error.response?.data?.message || error.message || "리뷰 삭제에 실패했습니다.",
        "error"
      );
    }
  };

  // 리뷰 승인 (admin 전용)
  const handleApproveReview = async (reviewId: string) => {
    if (!isAdmin) {
      showToast("권한이 없습니다.", "error");
      return;
    }

    if (!confirm("이 리뷰를 승인하시겠습니까?")) {
      return;
    }

    try {
      await approveReview(reviewId);
      showToast("리뷰가 승인되었습니다.", "success");
      loadReviews(); // 목록 새로고침
    } catch (error: any) {
      console.error("리뷰 승인 실패:", error);
      const errorMessage = error.response?.data?.message || error.message || "리뷰 승인에 실패했습니다.";
      
      // 403 Forbidden 에러 처리
      if (error.response?.status === 403) {
        showToast("리뷰 승인 권한이 없습니다.", "error");
      } else {
        showToast(errorMessage, "error");
      }
    }
  };

  // 리뷰 작성/수정 완료
  const handleReviewSuccess = () => {
    setShowForm(false);
    setEditingReview(null);
    showToast(
      editingReview
        ? "리뷰가 수정되었습니다. 관리자 승인 후 게시됩니다."
        : "리뷰가 작성되었습니다. 관리자 승인 후 게시됩니다.",
      "success"
    );
    loadReviews();
  };

  // 평균 별점 계산
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-4">환자 리뷰</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              {reviews.length > 0 && (
                <>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-[#8c6b3f]">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.round(averageRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-600">
                    총 {reviews.length}개의 리뷰
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-3">
              
              <button
                onClick={handleWriteReview}
                className="px-6 py-3 bg-[#e3ba75] text-[#2d2d2d] font-semibold rounded-md hover:bg-[#d4a865] transition-colors duration-200"
              >
                {currentUser ? "리뷰 작성하기" : "로그인 후 리뷰 작성"}
              </button>
            </div>
          </div>
        </div>

        {/* 리뷰 작성/수정 폼 */}
        {showForm && (currentUser || localStorage.getItem("token")) && (() => {
          // userId 추출 함수
          const getUserId = () => {
            if (currentUser?.id) return currentUser.id;
            
            // localStorage에서 확인
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              try {
                const userData = JSON.parse(storedUser);
                if (userData.id) return userData.id;
              } catch (e) {
                console.error("사용자 정보 파싱 실패:", e);
              }
            }
            
            // 토큰에서 ID 추출 시도
            const token = localStorage.getItem("token");
            if (token) {
              try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.sub || payload.userId || payload.id || "";
              } catch (e) {
                console.error("토큰에서 ID 추출 실패:", e);
              }
            }
            
            return "";
          };

          const userId = getUserId();
          if (!userId) {
            return (
              <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 mb-4">
                  사용자 정보를 불러올 수 없습니다. 페이지를 새로고침해주세요.
                </p>
              </div>
            );
          }

          return (
            <div className="mb-8">
              <ReviewForm
                review={editingReview || undefined}
                userId={userId}
                onSuccess={handleReviewSuccess}
                onCancel={() => {
                  setShowForm(false);
                  setEditingReview(null);
                }}
              />
            </div>
          );
        })()}

        {/* 로그인 안내 */}
        {showForm && !currentUser && !localStorage.getItem("token") && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-gray-700 mb-4">
              리뷰를 작성하려면 로그인이 필요합니다.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-[#e3ba75] text-[#2d2d2d] font-semibold rounded-md hover:bg-[#d4a865] transition-colors duration-200"
            >
              로그인하기
            </Link>
          </div>
        )}

        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e3ba75]"></div>
            <p className="mt-4 text-gray-600">리뷰를 불러오는 중...</p>
          </div>
        )}

        {/* 리뷰 목록 */}
        {!loading && reviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">아직 등록된 리뷰가 없습니다.</p>
            {currentUser && (
              <button
                onClick={handleWriteReview}
                className="px-6 py-3 bg-[#e3ba75] text-[#2d2d2d] font-semibold rounded-md hover:bg-[#d4a865] transition-colors duration-200"
              >
                첫 리뷰 작성하기
              </button>
            )}
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard
                isAdmin={isAdmin}
                onApprove={handleApproveReview}
                key={review.id}
                review={review}
                currentUserId={currentUser?.id}
                onEdit={currentUser?.id === review.user_id ? handleEditReview : undefined}
                onDelete={
                  currentUser?.id === review.user_id
                    ? handleDeleteReview
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {/* 홈으로 돌아가기 */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 text-[#2d2d2d] font-semibold rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 토스트 알림 */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}
