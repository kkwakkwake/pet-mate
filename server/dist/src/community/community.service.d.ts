import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
export declare class CommunityService {
    private communityRepository;
    private userRepository;
    private userProfileRepository;
    private communityLikeRepository;
    private communityCommentRepository;
    private communityImageRepository;
    private communityHashtagRepository;
    private hashtagRepository;
    constructor(communityRepository: Repository<CommunityEntity>, userRepository: Repository<UserEntity>, userProfileRepository: Repository<UserProfileEntity>, communityLikeRepository: Repository<CommunityLikeEntity>, communityCommentRepository: Repository<CommunityCommentEntity>, communityImageRepository: Repository<CommunityImageEntity>, communityHashtagRepository: Repository<CommunityHashtagEntity>, hashtagRepository: Repository<HashtagEntity>);
    getPosts(offset: number, postCount: number, orderBy: string): Promise<CommunityEntity[]>;
    getOnePost(postId: number): Promise<CommunityEntity>;
    getHotPosts(): Promise<CommunityEntity[]>;
    createPost(userId: number, createPostDto: CreatePostDto): Promise<CommunityEntity>;
    editPost(userId: number, postId: number, editPostDto: EditPostDto): Promise<{
        title: string;
        content: string;
        id: number;
        authorId: number;
        views: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        author: UserEntity;
        likes: CommunityLikeEntity[];
        comments: CommunityCommentEntity[];
        tags: CommunityHashtagEntity[];
        images: CommunityImageEntity[];
    } & CommunityEntity>;
    deletePost(userId: number, postId: number): Promise<CommunityEntity>;
    likePost(userId: number, postId: number): Promise<"like" | "unlike">;
    addComment(userId: number, postId: number, createCommentDto: CreateCommentDto): Promise<CommunityCommentEntity>;
    editComment(commentId: number, content: string): Promise<{
        content: string;
        id: number;
        createdAt: Date;
        deletedAt: Date;
        author: UserEntity;
        post: CommunityEntity;
    } & CommunityCommentEntity>;
    deleteComment(userId: number, commentId: number): Promise<import("typeorm").DeleteResult>;
    uploadImages(post: CommunityEntity, imgUrls: string[]): Promise<CommunityImageEntity[]>;
}
