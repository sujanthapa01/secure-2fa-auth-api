import 'dotenv/config';
import { seedSuperAdmin } from '../database/seeds/super-admin.seed';

seedSuperAdmin()
  .catch(console.error)
  .finally(() => process.exit(0));
