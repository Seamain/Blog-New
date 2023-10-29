import rss from '@astrojs/rss';
import { listPosts } from '../api/Post';
import formatDate from "../libs/formatDate";

export async function GET(context) {
    const posts = await listPosts();

  return rss({
    // 输出的 xml 中的`<title>`字段
    title: 'Seamain’s Blog',
    // 输出的 xml 中的`<description>`字段
    description: '这里是Seamain的博客哦！',
    // 从端点上下文获取项目“site”
    // https://docs.astro.build/zh-cn/reference/api-reference/#contextsite
    site: context.site,
    // 输出的 xml 中的`<item>`数组
    // 有关使用内容集合和 glob 导入的示例，请参阅“生成`items`”部分
      items: posts.data.map((post) => ({
          title: post.attributes.title,
          pubDate: formatDate(new Date(post.attributes.createdAt), "yyyy-MM-dd HH:mm"),
          description: post.attributes.summary,
          link: `/posts/${post.attributes.slug}`
    })),
  });
}