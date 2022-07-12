import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        nickname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        posts: import("../community/community.entity").CommunityEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        comments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
    }>;
    validateGoogleUser(email: string, name: string, accessToken: string): Promise<UserEntity>;
}
