var chai = require('chai');
var chaiHttp = require('chaiHttp');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('GET request on /api/llamas', function(){
    describe('should be successful', function(){
        it('in getting ALL llamas', function(done){
            chai.request(server)
            .get('/api/llamas')
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
        });
    });    
});


describe('POST request on /api/llamas', function(){
    describe('should be successful', function(){
        it('in adding a SINGLE llama', function(done){
            chai.request(server)
            .post('/api/llamas')
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
        });
    });    
});


describe('GET request on /api/llamas', function(){
    describe('should be successful', function(){
        it('in getting a SINGLE llama', function(done){
            chai.request(server)
            .get('/api/llamas/:id')
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
        });
    });    
});


describe('PUT request on /api/llamas', function(){
    describe('should be successful', function(){
        it('in editing a SINGLE llama', function(done){
            chai.request(server)
            .put('/api/llamas/:id')
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
        });
    });    
});


describe('DELETE request on /api/llama/:id', function(){
    describe('should be successful', function(){
        it('in deleting a SINGLE llama', function(done){
            chai.request(server)
            .delete('/api/llamas/:id')
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
        });
    });    
});
