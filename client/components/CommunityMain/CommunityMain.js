import {
  CommunityCon,
  Title,
  NoticeBtn,
  PostBtn,
  HeadWrapper,
  NoticeWrapper,
  Selection,
} from "./styled";

import { useSelector, useDispatch } from "react-redux";
import CommunityList from "./CommunityList";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

import {
  loadPostsRequestAction,
  showOldPostAction,
} from "../../reducers/community";

const SelectOptions = [
  { id: "latest", name: "new" },
  { id: "oldest", name: "old" },
  { id: "view", name: "조회 순" },
  { id: "like", name: "좋아요 순" },
];

const ListSelection = ({ onChange }) => {
  return (
    <Selection onChange={onChange}>
      {SelectOptions.map((item) => (
        <option key={item.id}>{item.name}</option>
      ))}
    </Selection>
  );
};

const Notice = (hotdata) => {
  const [noticeList, setNoticeList] = useState([]);
  //console.log(hotdata.hotdata.hotdata.data);
  useEffect(() => {
    setNoticeList(hotdata.hotdata.hotdata.data);
  }, []);

  return (
    <>
      {noticeList &&
        noticeList.map((notice) => (
          <NoticeWrapper key={notice.id}>
            <NoticeBtn>인기</NoticeBtn>
            <span>{notice.title}</span>
          </NoticeWrapper>
        ))}
    </>
  );
};

const CommunityMain = (hotdata) => {
  const [filterCond, setFilterCond] = useState("new");
  const { me } = useSelector((state) => state.user);
  const { postDone, posts } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postDone) {
      dispatch({ type: POST_RESET });
      console.log("글 리셋");
    }
  }, [postDone]);

  // useEffect(() => {
  //   dispatch(loadPostsRequestAction());
  //   //dispatch(showOldPostAction());
  // }, []);

  useEffect(() => {
    dispatch(loadPostsRequestAction(filterCond));
  }, [filterCond]);

  const goToNew = () => {
    if (!me) {
      Router.replace("/login");
    } else {
      Router.replace("/community/new");
    }
  };

  const loadPosts = async () => {
    const result = await axios.get("http://api.petmate.kr/community?count=100");
    const data = result.data.data;
    console.log(data);
  };

  const handleLoading = () => {
    dispatch(loadPostsRequestAction());
  };

  const handleListSelect = (e) => {
    const selectedCond = e.target.value;
    setFilterCond(selectedCond);
    console.log(e.target.value);

    //const selectedValue = e.target.value;
    // if (e.target.value === "오래된 순") {
    //   dispatch(showOldPostAction());
    // }
  };

  return (
    <CommunityCon>
      <button onClick={loadPosts}>게시글 불러오기</button>
      <button onClick={handleLoading}>커뮤니티 게시글 보기</button>
      <Title>커뮤니티</Title>
      <HeadWrapper>
        <ListSelection onChange={handleListSelect} />
        {me ? (
          <PostBtn onClick={goToNew}>
            <span>글쓰기</span>
          </PostBtn>
        ) : null}
      </HeadWrapper>
      <Notice hotdata={hotdata} />

      {/* {posts && posts.map((item) => <div key={item.id}>{item.content}</div>)} */}
      <CommunityList filterCond={filterCond} />
    </CommunityCon>
  );
};

export default CommunityMain;
