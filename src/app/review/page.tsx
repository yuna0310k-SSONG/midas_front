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
  }>({ message: "", type: "success", isVisible: false });

  // 1. 사용자 확인 및 리뷰 로드
  useEffect(() => {
    checkUser();
    loadReviews();
  }, [authUser]);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (!token) {
        setCurrentUser(null);
        return;
      }
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
      }
      const response = await api.get("/users/me").catch(() => null);
      if (response?.data) {
        setCurrentUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("User check failed", error);
    }
  };

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get("/reviews", {
        params: { is_approved: isAdmin ? undefined : true, order: "created_at.desc" },
      });
      const loadedReviews = response.data.data || response.data || [];
      setReviews(isAdmin ? loadedReviews : loadedReviews.filter((r: Review) => r.is_approved));
    } catch (error: any) {
      showToast("리뷰를 불러오는데 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- 핸들러 함수들 ---

  const handleApproveReview = async (reviewId: string) => {
    if (!isAdmin) return;
    if (!confirm("이 리뷰를 승인하시겠습니까?")) return;

    try {
      await approveReview(reviewId);
      showToast("리뷰가 승인되었습니다.");
      loadReviews();
    } catch (error) {
      showToast("승인 처리에 실패했습니다.", "error");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      showToast("삭제되었습니다.");
      loadReviews();
    } catch (error) {
      showToast("삭제 실패", "error");
    }
  };

  const handleWriteReview = () => {
    if (!localStorage.getItem("token")) {
      showToast("로그인이 필요합니다.", "info");
      return;
    }
    setEditingReview(null);
    setShowForm(true);
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type, isVisible: true });
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-[#fcfaf7] py-16 px-6 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* 헤더 */}
        <div className="mb-12 text-center space-y-3">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#b39359] uppercase">Experiences</span>
          <h1 className="text-3xl font-serif font-light tracking-tight text-gray-900 italic">Patient Reviews</h1>
          <div className="w-10 h-[1px] bg-gray-200 mx-auto mt-4"></div>
        </div>

        {/* 요약 카드 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-serif text-[#2d2d2d] mb-1">{averageRating.toFixed(1)}</div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Score</p>
            </div>
            <div className="h-10 w-[1px] bg-gray-100"></div>
            <div className="text-sm text-gray-500 font-light">
              총 <span className="font-medium text-gray-900">{reviews.length}</span>개의 소중한 후기가 있습니다.
            </div>
          </div>
          
          <button
            onClick={handleWriteReview}
            className="px-8 py-3 bg-gray-900 text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#b39359] transition-all"
          >
            후기 작성하기
          </button>
        </div>

        {/* 폼 섹션 */}
        {showForm && (
          <div className="mb-10">
            <ReviewForm
              review={editingReview || undefined}
              userId={currentUser?.id || ""}
              onSuccess={() => { setShowForm(false); loadReviews(); showToast("등록되었습니다."); }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* 리스트 섹션 */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center text-gray-400 text-sm">Loading...</div>
          ) : (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isAdmin={isAdmin}
                currentUserId={currentUser?.id}
                onApprove={handleApproveReview}
                onEdit={() => { setEditingReview(review); setShowForm(true); }}
                onDelete={handleDeleteReview}
              />
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-[10px] font-bold tracking-[0.2em] text-gray-300 hover:text-gray-900 transition-colors uppercase">
            Back to Home
          </Link>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
    </div>
  );
}