// 리뷰 데이터 타입 정의

export interface Review {
  id: string;
  user_id: string;
  name: string;
  content: string;
  rating: number; // 1~5
  before_image_url: string;
  after_image_url: string;
  is_approved: boolean;
  created_at: string;
}

export interface ReviewFormData {
  name: string;
  content: string;
  rating: number;
  before_image: File | null;
  after_image: File | null;
}
