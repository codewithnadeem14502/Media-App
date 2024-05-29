export interface Post {
  id: string;
  author: string;
  download_url: string;
}

export type OnPressFunction = (postId: number) => void;

export type RootStackParamList = {
  MainScreen: undefined;
  CameraScreen: undefined;
};
