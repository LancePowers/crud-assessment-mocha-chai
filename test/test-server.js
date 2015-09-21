process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-Http');
var mongoose =require('mongoose');

var server = require('../server/app');
var Llama = require('../server/models/llamas');

var should = chai.should();
chai.use(chaiHttp);


describe('Llamas', function(){
    
    Llama.collection.drop();
    
    beforeEach(function(done){
        var newLlama = new Llama ({
            name: 'Tina',
            age: 20,
            spitter: true
        });
        newLlama.save(function(err){
            done();
        });
    });
    afterEach(function(done){
        Llama.collection.drop();
        done();
    });
    
    describe('GET request on /api/llamas', function () {
        describe('should be successful', function () {
            it('in getting ALL llamas', function (done){
                chai.request(server)
                .get('/api/llamas')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.equal('Tina');
                    res.body[0].age.should.equal(20);
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
                .send({'name': 'Tina', 'age':'20', 'spitter': 'true'})
                .end(function(err,res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.body.SUCCESS.should.have.property('name');
                    res.body.SUCCESS.should.have.property('spitter');
                    res.body.SUCCESS.should.have.property('age');
                    res.body.SUCCESS.name.should.equal('Tina');
                    res.body.SUCCESS.age.should.equal(20);
                    res.body.SUCCESS.spitter.should.equal(true);
                    done();
                });
            });
        });    
    });


    describe('GET request on /api/llama', function(){
        describe('should be successful', function(){
            it('in getting a SINGLE llama', function(done){
                var newLlama = new Llama({
                    name: 'Fred',
                    age: 30,
                    spitter: 'true'
                });
                newLlama.save(function(err, data){
                chai.request(server)
                .get('/api/llama/'+data.id)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('age')
                    res.body.should.have.property('spitter');
                    res.body.name.should.equal('Fred');
                    res.body.age.should.equal(30);
                    res.body.spitter.should.equal(true);
                    res.body._id.should.equal(data.id);
                    done();
                    })
                });
            });
        });    
    });


    describe('PUT request on /api/llama', function(){
        describe('should be successful', function(){
            it('in editing a SINGLE llama', function(done){
                chai.request(server)
                    .get('/api/llamas')
                    .end(function(err, res){
                        chai.request(server)
                            .put('/api/llama/'+ res.body[0]._id)
                            .send({'spitter': false})
                            .end(function(error,response){
                                response.should.have.status(200);
                                response.should.be.json;
                                response.body.should.have.property('UPDATED');
                                response.body.UPDATED.should.be.a('object');
                                response.body.UPDATED.should.have.property('name');
                                response.body.UPDATED.should.have.property('_id');
                                response.body.UPDATED.spitter.should.equal(false);
                                response.body.UPDATED.name.should.equal('Tina');
                                done();
                            });
                        });
                });    
        });
    });


    describe('DELETE request on /api/llama/:id', function(){
        describe('should be successful', function(){
            it('in deleting a SINGLE llama', function(done){
                chai.request(server)
                    .get('/api/llamas')
                    .end(function(err,res){                   
                        chai.request(server)
                        .delete('/api/llama/'+res.body[0]._id)
                        .end(function(error,response){
                            response.should.have.status(200);
                            response.body.should.have.property('REMOVED');
                            response.body.should.be.json;
                            response.body.REMOVED.should.have.property('name');
                            response.body.REMOVED.name.should.equal('Tina');
                            done();
                        });
                    });
            });
        });    
    });
});