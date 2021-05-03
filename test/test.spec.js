const app = require('../app');
const request = require('supertest');
const db = require('../models');
const should = require('should');

// accounts

var cookie;
var cookie2;

describe('회원가입, 로그인 기능 시', () => {
    before(() => {
        return db.sequelize.sync({force: true})
    })
    describe('회원가입 성공 시', () => {
        it('Success Url로 Redirect 한다.(1)', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect(302)
                .expect('Location', '/accounts/success')
                .end((err, res) => {
                    cookie = res.headers['set-cookie'];
                    done();
                });
        })
        it('Success Url로 Redirect 한다.(2)', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@naver.com", password : "ckswhd123~"})
                .expect(302)
                .expect('Location', '/accounts/success')
                .end((err, res) => {
                    cookie2 = res.headers['set-cookie'];
                    done();
                });
        })
    })
    describe('회원가입 실패 시', () => {
        it('Error Url로 Redirect 한다.', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect(302)
                .expect('Location', '/accounts/error')
                .end(done);
        })
    })
    describe('로그인 성공 시', () => {
        it('Success Url로 Redirect한다.', (done) => {
            request(app)
                .post('/accounts/login')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect('Location', '/accounts/success')
                .end(done);
        })
    })
    describe('로그인 실패 시', () => {
        it('Error Url로 Redirect한다.', (done) => {
            request(app)
                .post('/accounts/login')
                .send({email : "s94203@nate.com", password : "wrongpassword"})
                .expect(302)
                .expect('Location', '/accounts/error')
                .end(done);
        })
    })
})


// Meeting

describe('POST /meeting/create 로 요청 시', () => {
    const location = "서울";
    const title = "스쿼트 같이 하실 분?";
    const find_people = 2;
    const body = "스쿼트 같이 할 근처에 서울사람 구합니다!";
    const category = "스쿼트";
    const address = "jugong3";
    
    describe('Meeting Create 성공 시', () => {
       it('생성된 Meeting 객체로 반환한다.', (done) => {
           request(app)
                .post('/meeting/create')
                .send({location, title, find_people, body, category, address})
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(201)
                    res.body.should.have.properties({location, title, find_people, body, category, address})
                    done();
                });
       }) 
    })
    describe('Meeting Create 실패 시', () => {
        it('유저가 인증되지 않으면 401을 반환한다.', (done) => {
            request(app)
                .post('/meeting/create')
                .send({location, title, find_people, body, category, address})
                .end((err, res) => {
                    res.status.should.be.equal(401)
                    res.body.should.have.property('message', 'User is not Authenticated');
                    done();
                })
        })
        it('정확한 Json Key들이 없으면 400을 반환한다,', (done) => {
            request(app)
                .post('/meeting/create')
                .send({find_people, body, category, address}) //location, title 누락
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(400)
                    res.body.should.have.property('message', 'Incorrect Json Key');
                    done();
                })
        })
        it('find_people field가 숫자가 아니면 400을 반환한다.', (done) => {
            request(app)    
                .post('/meeting/create')
                .send({location, title, find_people : "acw", body, category, address})
                .set('Cookie', cookie)
                .expect(401)
                .end((err, res) => {
                    res.status.should.be.equal(400)
                    res.body.should.have.property('message', 'find_people has to be number');
                    done();
                })
        })
    })
})

describe('PUT /meeting/update 로 요청 시,', () => {
    const location = "Test Location";
    const title = "Test Title";
    const find_people = 2;
    const body = "Test Body";
    const category = "Test Category";
    const address = "Test Address";
    const meeting_id =  1;
    describe('Meeting Update 성공 시', () => {
        it('Update된 Meeting의 객체를 반환한다.', (done) => {
            request(app)
                .put('/meeting/update')
                .send({location, title, body, category, address, meeting_id : 1})
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(200)
                    res.body.should.have.properties({location, title, find_people, body, category, address})
                    done();
                })
        })
    })
    describe('Meeting Update 실패 시', () => {
        it('유저가 인증되지 않으면 401을 반환한다.', (done) => {
            request(app)
                .put('/meeting/update')
                .send({location, title, find_people, body, category, address})
                .end((err, res) => {
                    res.status.should.be.equal(401);
                    res.body.should.have.property('message', 'User is not Authenticated');
                    done();
                })
        })
        it('meeintg_id의 host와 로그인된 user가 매칭이 안되면 401 반환,', (done) => {
            request(app)
                .put('/meeting/update')
                .send({location, title, find_people, body, category, address, meeting_id})
                .set('Cookie', cookie2)
                .end((err, res) => {
                    res.status.should.be.equal(401);
                    res.body.should.have.property('message', 'Meeting Host and User is not matched');
                    done();
                })
            })
        it('meeting_id가 field값으로 들어오지 않았을 때, 400을 반환한다', (done) => {
            request(app)
                .put('/meeting/update')
                .send({location, title, find_people, body, category, address})
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(400);
                    res.body.should.have.property('message', 'no meeting_id in JSON key');
                    done();
                })
        })
        it('meeting_id에 맞는 Meeting Object가 없을 때', (done) => {
            request(app)
                .put('/meeting/update')
                .send({location, title, find_people, body, category, address, meeting_id : 100})
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(404);
                    res.body.should.have.property('message', 'Meeting Object Not Found');
                    done();
                })
        })
    })
})

describe('GET /meeting/list 로 요청 시', () => {
    describe('GET Meeting List 성공 시', () => {
        it('전체 Meeting Object를 가져온다.', (done) => {
            request(app)
                .get('/meeting/list')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })
    })
})

describe('GET /meeting/:id 로 요청 시', () => {
    describe('GET Meeting Detail 성공 시', () =>{
        it('id의 Meeting Object를 가져온다.', (done) => {
            request(app)
                .get('/meeting/1')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    })
    describe('GET Meeting Detail 실패 시', () => {
        it('id가 숫자로 들어오지 않았을 때', (done) => {
            request(app)
                .get('/meeting/aw')
                .end((err, res) => {
                    res.status.should.be.equal(400);
                    res.body.should.have.property('message', 'Id is not number');
                    done();
                })
        })
    })
})

describe('DELETE /meeting/delete 요청 시', () => {
    describe('Meeting Delete 성공 시', () => {
        it('성공 메세지를 반환한다', (done) => {
            request(app)
                .delete('/meeting/delete')
                .send({meeting_id : 1})
                .set('Cookie', cookie)
                .end((err,res) => {
                    res.status.should.be.equal(200);
                    res.body.should.have.property('message', 'Delete Success!');
                    done();
                })
        })
    })
})

// Competition
describe('POST /comp/create 요청 시,', () => {
    const comp_type = "경쟁"; // 경쟁, 챌린지
    const location = "서울";
    const category = "푸쉬업";
    const title = "푸쉬업 자신있는 사람 들어오세요.";
    const ended_at = "2021-01-25";
    const max_people = 100;
    // const joined_people = [];
    const require_money = 1000;
    // const total_money = 0;
    // joined_people, host 자동 생성
    
    describe('Competition Create 성공 시,', () => {
        it('성공 메세지를 반환한다.', (done) => {
            request(app)
                .post('/comp/create')
                .send({comp_type, location, category, title, ended_at, max_people, require_money}) 
                .set('Cookie', cookie)
                .end((err, res) => { 
                    res.status.should.be.equal(201);
                    res.body.should.have.properties({comp_type, location, category, title, ended_at, max_people, require_money});
                    done();
                })
        })
    })
    describe('Competition Create 실패 시,', () => {
        it('유저 인증 실패 시, 에러 메세지를 반환한다.', (done) => {
            request(app)
                .post('/comp/create')
                .send({comp_type, location, category, title, ended_at, max_people, require_money}) 
                .end((err, res) => {
                    res.status.should.be.equal(401);
                    res.body.should.have.property('message', 'User is not Authenticated');
                    done();
                })
        })
        it('정확한 Json Key들이 없으면 400을 반환한다.', (done) => {
            request(app)   
                .post('/comp/create')
                .send({comp_type, location, category, title, ended_at}) // require_money, max_people 누락
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(400);
                    res.body.should.have.property('message', 'Incorrect Json Key');
                    done();
                })
            })
        it('max_people의 값이 숫자가 아닐 때, 400을 반환한다.', (done) => {
            request(app)
                .post('/comp/create')
                .send({comp_type, location, category, title, ended_at, max_people : 'qw', require_money}) 
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(400);
                    res.body.should.have.property('message', 'max_people has to be number');
                    done();
                }) 
        })
    })
})

describe('PUT /comp/join/:id 요청 시,', () =>{
    const money = 1000;
    describe('Competition PUT 성공 시,', () => {
        it('user id와 경쟁의 total_money를 반환한다.', (done) => {
            request(app)
                .put('/comp/join/1')
                .set('Cookie', cookie)
                .send({money})
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    res.body.should.have.property('message', 'Join Success!');
                    done();
                })
        })
    })
    describe('Competition PUT 실패 시,', () => {
        it('유저 인증 실패 시, 에러 메세지를 반환한다.', (done) => {
            request(app)
                .put('/comp/join/1')
                .send({money})
                .end((err, res) => {
                    res.status.should.be.equal(401);
                    res.body.should.have.property('message', 'User is not Authenticated');
                    done();
                })
        })
        it('Competition PK에 해당하는 객체가 없을 시, 에러 메세지를 반환한다.', (done) => {
            request(app)
                .put('/comp/join/2')
                .send({money})
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(400);
                    res.body.should.have.property('message', 'Competition Object Not Found');
                    done();
                })
        })
        it('Url Parameter로 들어온 id가 숫자가 아닐 때, 에러 메세지를 반환한다.', (done) => {
            request(app)
                .put('/comp/join/asw')
                .send({money})
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.status.should.be.equal(400);
                    res.body.should.have.property('message', 'Id is not number');
                    done();
                })          
        })
        // it('이미 참여한 사람이면, 에러 메세지를 반환한다.', (done) => {
        //     request(app)
        //         .put('/comp/join/1')
        //         .send({})
        // })
    })
})

// describe('DELETE /comp/delete/?pk=1 요청 시,', () =>{
//     const comp_pk = 1;
//     describe('Competition Delete 성공 시,', () =>{
//         it('성공 메세지를 반환한다.', (done) =>{
//             request(app)
//                 .delete('/comp/delete')
//                 .send({comp_pk})
//                 .set('Cookie', cookie)
//                 .end((err, res) => {
//                     res.status.should.be.equal(200);
//                     res.body.should.have.property('message', 'Delete Success!');
//                     done();
//                 })
//         })
//     })
//     describe('Competition Delete 실패 시,', () => {
//         it('유저 인증 실패 시, 에러 메세지를 반환한다.', (done) => {
//             request(app)
//                 .delete('/comp/delete')
//                 .send({comp_pk})
//                 .end((err, res) => {
//                     res.status.should.be.equal(401);
//                     res.body.should.have.property('message', 'User is not Authenticated');
//                     done();
//                 })
//         })
//         it('Competition PK에 해당하는 객체가 없을 시, 에러 메세지를 반환한다.', (done) => {
//             request(app)
//                 .delete('/comp/delete')
//                 .send({comp_pk})
//                 .set('Cookie', cookie)
//                 .end((err, res) => {
//                     res.status.should.be.equal(400);
//                     res.body.should.have.property('message', 'Competition Object Not Found');
//                     done();
//                 })
//         })
//         it('경쟁을 만든 Host가 아닐 시, 에러 메세지를 반환한다.', (done) => {
//             request(app)
//                 .delete('/comp/delete')
//                 .send({comp_pk})
//                 .set('Cookie', cookie)
//                 .end((err, res) => {
//                     res.status.should.be.equal(400);
//                     res.body.should.have.property('message', 'You are not the owner of this Competition.');
//                     done();
//                 })
//         })
//     })

// })

// describe('GET /comp/list 요청 시,', () => {
//     it('현재 있는 Competition List를 반환한다.', (done) => {
//         request(app)
//             .get('/comp/list')
//             .end((err, res) => {
//                 res.status.should.be.equal(200);
//                 res.body.should.have.properties('message', 'You are not the owner of this Competition.');
//                 res.body.should.have.properties({comp_type, location, category, title, ended_at, max_people, require_money});
//             })
//     })
// })

// describe('GET /comp/:id 로 요청 시', () => {
//     describe('GET Competition Detail 성공 시', () =>{
//         it('id의 Competition Object를 가져온다.', (done) => {
//             request(app)
//                 .get('/comp/1')
//                 .end((err, res) => {
//                     res.status.should.be.equal(200);
//                     res.body.should.have.property('id', 1);
//                     done();
//                 })
//         })
//     })
//     describe('GET Comp Detail 실패 시', () => {
//         it('id가 숫자로 들어오지 않았을 때', (done) => {
//             request(app)
//                 .get('/comp/aw')
//                 .end((err, res) => {
//                     res.status.should.be.equal(400);
//                     res.body.should.have.property('message', 'Id is not number');
//                     done();
//                 })
//         })
//     })
// })
