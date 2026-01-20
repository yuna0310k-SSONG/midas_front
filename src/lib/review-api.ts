/**
 * 리뷰 관련 API 함수
 */
import api from "./api";
import { Review } from "@/types/review";

/**
 * 리뷰 승인
 */
export async function approveReview(reviewId: string): Promise<Review> {
  const response = await api.patch(`/reviews/${reviewId}/approve`);
  return response.data;
}

/**
 * 리뷰 승인 취소
 */
export async function rejectReview(reviewId: string): Promise<Review> {
  const response = await api.patch(`/reviews/${reviewId}/reject`);
  return response.data;
}

/**
 * 미승인 리뷰 목록 조회 (admin 전용)
 * is_approved가 false인 리뷰만 반환
 */
export async function getPendingReviews(): Promise<Review[]> {
  const response = await api.get("/reviews", {
    params: {
      is_approved: false,
      order: "created_at.desc",
    },
  });
  
  const reviews = response.data.data || response.data || [];
  
  // 프론트엔드에서도 is_approved가 false인 것만 필터링 (백엔드 필터링 실패 대비)
  return reviews.filter((review: Review) => review.is_approved === false);
}

/**
 * 모든 리뷰 조회 (admin 전용, 승인 여부 관계없이)
 */
export async function getAllReviews(): Promise<Review[]> {
  const response = await api.get("/reviews?all=true");
  return response.data.data || response.data;
}
