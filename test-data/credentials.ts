export const credentials = {
  baseUrl:
    process.env.SCHOOL_ERP_BASE_URL ??
    'https://schoolwebsiteui.aaditechnology.com',
  schoolName:
    process.env.SCHOOL_ERP_SCHOOL ?? 'Pawar Public School, hadapsar',
  username: process.env.SCHOOL_ERP_USERNAME ?? 'User341',
  password: process.env.SCHOOL_ERP_PASSWORD ?? 'Test@123',
};

export const routes = {
  schoolList: '/schoolList',
  aadhaarCard: '/RITeSchool/Teacher/AadharCard',
};
