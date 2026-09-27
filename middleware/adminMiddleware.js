const adminonly = (req,res,next) =>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
            success:false,
            message:"Access Denied admin only!."
        })
    }
    next();
}

export default adminonly