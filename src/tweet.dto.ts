//#region Dtos
interface GetTweet {
  id: string;
}

interface PostTweet {
  text: string;
  userId: string;
}
interface DeleteTweet extends GetTweet {}
//#endregion

export { GetTweet, PostTweet, DeleteTweet };
