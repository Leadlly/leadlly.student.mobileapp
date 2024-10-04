import { Dimensions } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

const DashboardSkeletonLoader = () => {
  const containerWidth = Dimensions.get("window").width;

  return (
    <ContentLoader
      speed={2}
      height={288}
      width={containerWidth - 64}
      viewBox={`0 0 ${containerWidth - 64} 288`}
      backgroundColor="#fff"
    >
      <Rect x="5" y="5" rx="2" ry="2" width={120} height={22} />
      <Rect x="5" y="32" rx="2" ry="2" width={100} height={15} />
      <Rect x="5" y="70" rx="2" ry="2" width={18} height={18} />
      <Rect
        x="30"
        y="70"
        rx="2"
        ry="2"
        width={containerWidth - 120}
        height={18}
      />
      <Rect x="5" y="100" rx="2" ry="2" width={18} height={18} />
      <Rect
        x="30"
        y="100"
        rx="2"
        ry="2"
        width={containerWidth - 120}
        height={18}
      />
      <Rect x="5" y="130" rx="2" ry="2" width={18} height={18} />
      <Rect
        x="30"
        y="130"
        rx="2"
        ry="2"
        width={containerWidth - 120}
        height={18}
      />
      <Rect x="5" y="160" rx="2" ry="2" width={18} height={18} />
      <Rect
        x="30"
        y="160"
        rx="2"
        ry="2"
        width={containerWidth - 120}
        height={18}
      />
    </ContentLoader>
  );
};

export default DashboardSkeletonLoader;
