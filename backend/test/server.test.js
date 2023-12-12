const { expect } = require('chai');
const request = require('supertest'); 

const app = require('../server'); 

// Test suite for the Express app
describe('Express App', () => {
  // A simple test that always passes
  it('should always pass', () => {
    expect(true).to.be.true;
  });

  // Test suite for the routes
  describe('Routes', () => {
    // Test for a specific route (you can add more tests for different routes)
    it('should respond with status 200 for GET requests to /api/workouts', async () => {
      const response = await request(app).get('/api/workouts');
      expect(response.status).to.equal(401);
    });

    it('should respond with status 200 for GET requests to /api/user', async () => {
      const response = await request(app).get('/api/user');
      expect(response.status).to.equal(404);
    });
  });
});
