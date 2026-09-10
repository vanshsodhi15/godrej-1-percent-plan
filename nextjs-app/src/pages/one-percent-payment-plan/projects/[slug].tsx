import { GetStaticPaths } from 'next';
import FreedomProjectPage, {
  getStaticProps,
  onePercentCampaignProjectSlugs,
} from '@/pages/the-freedom-plan/projects/[slug]';

export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: onePercentCampaignProjectSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export default FreedomProjectPage;