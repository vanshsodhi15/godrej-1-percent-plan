import { GetStaticPaths } from 'next';
import FreedomProjectPage, {
  clpCampaignProjectSlugs,
  getStaticProps,
} from '@/pages/the-freedom-plan/projects/[slug]';

export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: clpCampaignProjectSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export default FreedomProjectPage;