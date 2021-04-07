const app = require('../app');
const request = require('supertest');
const db = require('../models');
const should = require('should');

describe('회원가입, 로그인 기능은', () => {
    before(() => {
        return db.sequelize.sync({force: true})
    })
    describe('회원가입 시', () => {
        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect(200)
                .end((err, res) => {
                    console.log(res);
                    done();
                })
        })
    })
})