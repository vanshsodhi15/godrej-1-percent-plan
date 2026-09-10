import { GetStaticPaths } from 'next';
import FreedomProjectPage, {
  freedomCampaignProjectSlugs,
  getStaticProps,
} from '@/pages/the-freedom-plan/projects/[slug]';

export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: freedomCampaignProjectSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export default FreedomProjectPage;