"use client";

import Image from "next/image";
import { Review } from "@/types/review";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
}

export default function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const isOwner = currentUserId && review.user_id === currentUserId;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* 헤더 - 이름, 별점, 날짜 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="font-semibold text-[#2d2d2d] text-lg">
              {review.name}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {format(new Date(review.created_at), "yyyy년 MM월 dd일", {
              locale: ko,
            })}
          </span>
        </div>

        {/* 수정/삭제 버튼 (본인 리뷰만) */}
        {isOwner && (onEdit || onDelete) && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(review)}
                className="px-3 py-1 text-sm text-[#8c6b3f] hover:bg-gray-100 rounded-md transition-colors"
              >
                수정
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(review.id)}
                className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                삭제
              </button>
            )}
          </div>
        )}
      </div>

      {/* 리뷰 내용 */}
      <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>

      {/* 전/후 이미지 - 좌우 배치 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 시술 전 이미지 */}
        <div className="relative">
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-semibold z-10">
            시술 전
          </div>
          <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={review.before_image_url}
              alt="시술 전"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* 시술 후 이미지 */}
        <div className="relative">
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-semibold z-10">
            시술 후
          </div>
          <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={review.after_image_url}
              alt="시술 후"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* 고지 문구 */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          ※ 치료 효과에는 개인차가 있을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
