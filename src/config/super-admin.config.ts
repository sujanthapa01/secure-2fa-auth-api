import { registerAs } from '@nestjs/config'

export default registerAs('superAdmin', () =>({
    email: process.env.SUPER_ADMIN_EMAIL!,
    password: process.env.SUPER_ADMIN_PASSWORD!,
    name: process.env.SUPER_ADMIN_NAME!
    
}))