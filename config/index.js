module.exports = {
    port: process.env.PORT || 3000,
    session :{
        keys:"HFSDC-VVDVS",
        secret:"HFSDC-VVDVS",
        resave:false,
        cookie:{
            maxAge: 24 * 60 * 60 * 1000
        },
        store:"mongodb://localhost/store"
    },
    db:"mongodb://localhost/myblog"
}