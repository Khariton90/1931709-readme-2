export class UpdatePostDto {
  id?: number;
  title?: string;
  videoUrl?: string;
  preview?: string;
  tags?: string[];
  description?: string;
  quote: string;
  authorId: string;
  photo: string;
  link: string;
  createdAt?: Date
  publishAt?: Date
}

