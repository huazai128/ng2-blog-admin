//������֤�û��Ƿ��¼
module.exports = {
    checkLogin :function(req,res,next){ //��������ҳ�����Ȩ��ҳ��ʱ�������ж�
        if(!req.session.userId){
            return res.json({success:false});  //����ʧ��
        }
        next();
    },
    checkNotLogin:function(req,res,next){  //���ڵ�¼ע�ᣬ��ҳ��������ж�
        if(req.session.userId){
            return res.json({success:true})
        }
        next();
    }
};