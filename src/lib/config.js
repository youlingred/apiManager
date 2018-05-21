const config={
    base_url:process.env.NODE_ENV==='development'?'http://localhost:3000':window.location.origin,
    url(api_url){
        return `${this.base_url}/${api_url}`
    }
};
export default config;