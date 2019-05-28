// 封装axios 所有接口的封装文件
import axios from 'axios';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials  = true;
axios.defaults.withCredentials = true
axios.defaults.timeout = 50000;
// axios.defaults.headers = {
//     "Access-Control-Allow-Origin":"*",
//     "Access-Control-Allow-Headers":"x-requested-with,content-type",
//     'Content-Type': 'application/json',
//     'Cache-Control': 'no-cache'
// };
axios.defaults.baseURL = process.env.NODE_ENV == "development" ? 'https://teacher.yuangaofen.com/' : 'https://teacher.yuangaofen.com/';
axios.interceptors.response.use(
    response => {
        console.log(response)
        return response;
    },
    error => {
        console.log(error.response)
        return Promise.reject(error.response) // 返回接口返回的错误信息
    }
);
//登陆后获取用户信息GET /userManage/getInfo  
export const getInfo = params => { return axios.get(`/userManage/getInfo`, params).then(res => res.data) }


//获取授权状态
export const getStatus = params => { return axios.get(`/Courseware/getStatus`, params).then(res => res.data) }

//获取评卷课件授权二维码
export const getQR = params => {
    return axios.get(`/Courseware/getQR`, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        }
    }).then(res => {
        console.log(res)
        return res.data
    })
}

//封面信息获取
// {
//     examId:''
// }
export const getExamInfo = params => { return axios.get(`/examCourseware/getExamInfo/${params.id}`).then(res => res.data) }

//获取本次考试的评卷
// 
//     examId:''
// }
export const getQuestionList = params => { return axios.get(`/examCourseware/getQuestionList/${params.id}`).then(res => res.data) }

//获取评卷的平均得分和得分率
// {
//     examId:'',
//     questionId:'',
// }
// {examCourseware/getRatio?examId=529&questionId=1209 有数据
export const getRatio = params => { return axios.get(`/examCourseware/getRatio?examId=${params.examId}&questionId=${params.questionId}`).then(res => res.data) }
    //获取各区间的信息集合
    // {
    //     examId:'',
    //     questionId:'',
    //     sectionType:'' 区间类型:1满分,2丢分,3零分,4收藏
    // }
    // getSectionInfo?examId=533&questionId=1251&sectionType=1
    // export const getSectionInfo = params => { return axios.get(`/examCourseware/getSectionInfo`, params).then(res => res.data) }
export const getSectionInfo = params => { return axios.get(`/examCourseware/getSectionInfo?examId=${params.examId}&questionId=${params.questionId}&sectionType=${params.sectionType}`).then(res => res.data) }
    // export const getSectionInfo = params => { return axios.get(`/examCourseware/getSectionInfo?examId=533&questionId=1251&sectionType=1`).then(res => res.data) }
    //获取选择题的数据比较
    // {
    //     examId:'',
    //     questionId:''
    // }
    //getSelectRatio?examId=762&questionId=1676
export const getSelectRatio = params => { return axios.get(`/examCourseware/getSelectRatio?examId=${params.examId}&questionId=${params.questionId}`).then(res => res.data) }

//获取主观题的数据比较
// {
//     examId:'',
//     questionId:''
// }
// getSubjective?examId=533&questionId=1251
// export const getSubjective = params => { return axios.get(`/examCourseware/getSubjective `, params).then(res => res.data) }
export const getSubjective = params => { return axios.get(`/examCourseware/getSubjective?examId=${params.examId}&questionId=${params.questionId}`).then(res => res.data) }



//根据老师id获取考试列表
//null
export const getExamList = params => { return axios.get(`/examEvaluation/getExamList `, params).then(res => res.data) }

//根据老师id模糊查询并分页
// {
//     pageNum:'',
//     searchName:''
// }
// getLikeExamNameList?pageNum=2&searchName=20
export const getLikeExamNameList = params => { return axios.get(`/examEvaluation/getLikeExamNameList?pageNum=${params.pageNum}&searchName=${params.searchName}`).then(res => res.data) }
    // export const getLikeExamNameList = params => { return axios.get(`/examEvaluation/getLikeExamNameList?pageNum=${params.pageNum}`).then(res => res.data) }
    // 获取相似题  根据questionId获取
export const getAcquaintanceTopic = params => { return axios.get(`/examCourseware/getAcquaintanceTopic/${params.questionId}`).then(res => res.data) }