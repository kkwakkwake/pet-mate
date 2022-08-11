# :pushpin: 펫메이트
<img width="949" alt="캡처" src="https://user-images.githubusercontent.com/48177285/181407026-7aba65ce-96ae-43b6-9c0e-df677ae49376.PNG">

>애완동물 커뮤니티  
>http://petmate.kr 

</br>

## 1. 제작 기간 & 참여 인원
- 2022.6.28 ~ 2022.7.26
- Back-End : 조용원
- Front-End : 곽성이, 손유경

</br>

## 2. 사용 기술
### Front-End
<img width="495" alt="캡처" src="https://user-images.githubusercontent.com/48177285/181400595-975a7443-df2a-476a-8a97-2d397c68b4a0.PNG">

### Back-End
<img width="551" alt="backend" src="https://user-images.githubusercontent.com/48177285/181399540-95c6e339-2749-4b2b-852a-a2761adff997.PNG">

### Infra
<img width="283" alt="캡처" src="https://user-images.githubusercontent.com/48177285/181401569-83613323-99ce-4f4f-9ad0-10248f832518.PNG">

</br>

## 3. ERD
<img width="659" alt="erd" src="https://user-images.githubusercontent.com/48177285/181696667-c02c865e-eb52-492b-aae9-4146d96beece.PNG">




>상세보기
https://www.erdcloud.com/d/4i3JW87RGiuJyFCNL

## 4. 핵심 기능
<details>
<summary><b>프론트엔드</b></summary>
<div markdown="1">


#### 4.1. 회원가입 & 로그인 
- 유효성 검사 :pushpin: [코드 확인](https://github.com/kkwakkwake/pet-mate/blob/36b6cc61207eaffd93025eb8d2fc6a9def309db0/client/components/SignUp/SignUp.js#L107)
- 닉네임, 이메일 중복확인   

#### 4.2. 유저 프로필

#### 4.3. 메인페이지 
- 인기게시글 SSR :pushpin: [코드 확인](https://github.com/kkwakkwake/pet-mate/blob/be83f5d2eb6709937a59b7069c2e266180cc0bf8/client/pages/index.js#L20)
- 반응형

#### 4.4. 커뮤니티 
- SSR
- 게시글
  - 조회
    - 게시글 조건부 필터링
    - 더보기 :pushpin: [코드 확인](https://github.com/kkwakkwake/pet-mate/blob/74536a0c23da65299981f5a6b2cbd1302503bac0/client/components/CommunityMain/CommunityList.js#L31) :pushpin: [코드 확인](https://github.com/kkwakkwake/pet-mate/blob/74536a0c23da65299981f5a6b2cbd1302503bac0/client/sagas/community.js#L106)
  - 등록
  - 수정
  - 삭제
- 댓글
  - 등록
  - 삭제
- 해쉬태그 검색
- 좋아요

#### 4.5. 산책메이트 
- 
  - 조회
  - 등록 :pushpin: [코드 확인](https://github.com/kkwakkwake/pet-mate/blob/17ef50cb999c51fd2411a2aa782f6dfd006c0b52/client/components/SanchaekPost/SanchaekPost.js#L149)
  - 수정
  - 삭제
- 댓글
  - 등록
  - 삭제
  
</div>
</details>

<details>
<summary><b>백엔드</b></summary>
<div markdown="1">


#### 4.1. 인증 :pushpin: [코드 확인](https://github.com/joyw93/pet-mate/tree/main/server/src/auth)
- 로그인
  - 이메일
  - 구글
  - 카카오

#### 4.2. 유저 :pushpin: [코드 확인](https://github.com/joyw93/pet-mate/tree/main/server/src/user)
- 회원가입
- 프로필 수정
- 계정정보 수정
- 내 게시글 조회

#### 4.3. 커뮤니티 :pushpin: [코드 확인](https://github.com/joyw93/pet-mate/tree/main/server/src/community)
- 게시글
  - 조회
  - 등록
  - 수정
  - 삭제
- 댓글
  - 등록
  - 삭제
- 해쉬태그
- 좋아요

#### 4.4. 산책메이트 :pushpin: [코드 확인](https://github.com/joyw93/pet-mate/tree/main/server/src/sanchaek)
- 산책
  - 조회
  - 등록
  - 수정
  - 삭제
- 댓글
  - 등록
  - 삭제
  
</div>
</details>

## 5. 트러블 슈팅
<!-- <details>
<summary><b>백엔드</b></summary>
<div markdown="1">

### 5.1 커뮤니티 게시글 등록

<details>
<summary><b>설명 펼치기</b></summary>
<div markdown="1">

<br/>

~~~javascript
/*
community.controller.ts
*/

  @Post()
  @UseInterceptors(FilesInterceptor('images', 3, createPostConfig))
  async createPost(
    @User() user: UserEntity,
    @UploadedFiles(ImageFilePipe) imgUrls: string[],
    @Body(CommunityCreatePipe) createPostDto: CreatePostDto,
  ) {
    const { hashtags } = createPostDto;
    const post = await this.communityService.createPost(user.id, createPostDto);
    if (hashtags) {
      await this.hashtagService.addTags(post, hashtags);
    }
    if (imgUrls) {
      await this.communityService.uploadImages(post, imgUrls);
    }
    return post;
  }
~~~

- 게시글 등록/수정의 경우 컨트롤러에서 다음과 같이 세개의 서비스 함수를 순서대로 호출하는 방식으로 코드를 작성했습니다.
  - 게시글 저장
  - 해쉬태그 등록
  - 이미지 등록

</div>
</details>

</div>
</details> -->

## 6. More Info
- 협업 문서
https://www.notion.so/4061678abea846c6b4f4858e4b8725a0
