const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userModel = require('../models/userModel'); 

describe('User Model', () => {
  describe('signup method', () => {
    it('should create a user when valid input is provided', async () => {
      // Mock dependencies
      sinon.stub(validator, 'isEmail').returns(true);
      sinon.stub(validator, 'isStrongPassword').returns(true);
      sinon.stub(bcrypt, 'genSalt').resolves('mockedSalt');
      sinon.stub(bcrypt, 'hash').resolves('mockedHash');
      sinon.stub(userModel, 'findOne').resolves(null);
      sinon.stub(userModel, 'create').resolves({ email: 'test@example.com' });

      // Call the signup method
      const user = await userModel.signup('test@example.com', 'password123');

      // Assert
      expect(user.email).to.equal('test@example.com');

      // Restore the original functions
      sinon.restore();
    });

    // Add more tests for different scenarios
  });

  describe('login method', () => {
    it('should return the user when valid credentials are provided', async () => {
      // Mock dependencies
      sinon.stub(userModel, 'findOne').resolves({
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      });
      sinon.stub(bcrypt, 'compare').resolves(true);

      // Call the login method
      const user = await userModel.login('test@example.com', 'password123');

      // Assert
      expect(user.email).to.equal('test@example.com');

      // Restore the original functions
      sinon.restore();
    });

    // Add more tests for different scenarios
  });
});
