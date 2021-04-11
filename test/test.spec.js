const app = require('../app');
const request = require('supertest');
const db = require('../models');
const should = require('should');

// accounts
var cookie;

describe('회원가입, 로그인 기능은', () => {
    before(() => {
        return db.sequelize.sync({force: true})
    })
    describe('회원가입 성공 시', () => {
        it('Success Url로 Redirect 한다.', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect(302)
                .expect('Location', '/accounts/success')
                .end(done);
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
                .end((err, res) => {
                    cookie = res.headers['set-cookie'];
                    done();
                });
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

describe('POST /meeting/create 는', () => {
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
                .expect(200)
                .set('Cookie', cookie)
                .end((err, res) => {
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
                .expect(401)
                .end((err, res) => {
                    res.body.should.have.property('message', 'User is not Authenticated');
                    done();
                })
        })
        it('정확한 Json Key들이 없으면 400을 반환한다,', (done) => {
            request(app)
                .post('/meeting/create')
                .send({find_people, body, category, address}) //location, title 누락
                .set('Cookie', cookie)
                .expect(400)
                .end((err, res) => {
                    res.body.should.have.property('message', 'Incorrect Json Key');
                    done();
                })
        })
        it('find_people field가 숫자가 아니면 400을 반환한다.', (done) => {
            request(app)    
                .post('/meeting/create')
                .send({location, title, find_people : "acw", body, category, address})
                .set('Cookie', cookie)
                .expect(400)
                .end((err, res) => {
                    res.body.should.have.property('message', 'find_people has to be number');
                    done();
                })
        })
    })
})