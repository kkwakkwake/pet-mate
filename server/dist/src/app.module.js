"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const user_service_1 = require("./user/user.service");
const user_entity_1 = require("./user/user.entity");
const community_module_1 = require("./community/community.module");
const community_entity_1 = require("./community/community.entity");
const community_like_entity_1 = require("./common/entities/community-like.entity");
const hashtag_module_1 = require("./hashtag/hashtag.module");
const community_hashtag_entity_1 = require("./common/entities/community-hashtag.entity");
const ormconfig = require("../ormconfig");
const user_profile_entity_1 = require("./common/entities/user-profile.entity");
const sanchaek_module_1 = require("./sanchaek/sanchaek.module");
const sanchaek_entity_1 = require("./sanchaek/sanchaek.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(ormconfig),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                user_profile_entity_1.UserProfileEntity,
                community_entity_1.CommunityEntity,
                community_like_entity_1.CommunityLikeEntity,
                community_hashtag_entity_1.CommunityHashtagEntity,
                sanchaek_entity_1.SanchaekEntity
            ]),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            community_module_1.CommunityModule,
            hashtag_module_1.HashtagModule,
            sanchaek_module_1.SanchaekModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, user_service_1.UserService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map