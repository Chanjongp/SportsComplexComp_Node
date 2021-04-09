const HOME = "/";
const LOGIN = "/login";
const LOGOUT = "/logout";

// User
const USER = "/accounts";
const USER_DETAIL = "/:id";
const MYMEETING = "/mymeetinglist";
const MYCOMP = "/mycomplist";

// Meeting

const MEETING = "/meeting";
const MEETING_ALL = "/list"
const MEETING_DETAIL = "/:id";
const MEETING_CREATE = "/create";
const MEETING_UPDATE = "/update";
const MEETING_DELETE = "/delete";

const routes = {
    home : HOME,
    login : LOGIN,
    logout : LOGOUT,
    user : USER,
    userDetail : USER_DETAIL,
    mymeeting : MYMEETING,
    mycomp : MYCOMP,
    
    meeting : MEETING,
    meetingAll : MEETING_ALL,
    meetingDetail : MEETING_DETAIL,
    meetingCreate : MEETING_CREATE,
    meetingUpdate : MEETING_UPDATE,
    meetingDelete : MEETING_DELETE,
}

module.exports = routes;