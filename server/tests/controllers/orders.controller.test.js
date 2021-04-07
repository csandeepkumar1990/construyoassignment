const ordersController = require('../../controllers/orders.controller')
const { mockRequest, mockResponse } = require('../../mockUtils/reqres');
const { get } = require('../../services/orders.service.js');

jest.mock('../../services/orders.service.js', () => (
    {
      getAll: jest.fn().mockReturnValue([
        {title: 'Title1', bookingDate: '07-04-2021', address: {
            "street": "2694 Renwick Drive",
            "zip": "19108",
            "city": "Philadelphia",
            "country": "United States"
        },customer: {
            "name": "Andrew Mead",
            "city": "Philadelphia",
            "email": "andrew123@gmail.com"
            }}
      ]),
      get: jest.fn().mockReturnValue({title: 'Title1', bookingDate: '07-04-2021', address: {
            "street": "2694 Renwick Drive",
            "zip": "19108",
            "city": "Philadelphia",
            "country": "United States"
        }, customer: {
             "name": "Andrew Mead",
            "city": "Philadelphia",
            "email": "andrew123@gmail.com"
        }}),
      create: jest.fn().mockReturnValue({title: 'Title1', bookingDate: '07-04-2021', address: {
            "street": "2694 Renwick Drive",
            "zip": "19108",
            "city": "Philadelphia",
            "country": "United States"
        }, customer: {
             "name": "Andrew Mead",
            "city": "Philadelphia",
            "email": "andrew123@gmail.com"
        }}),
      update: jest.fn().mockReturnValue({title: 'Title1', bookingDate: '07-04-2021', address: {
            "street": "2694 Renwick Drive",
            "zip": "19108",
            "city": "Philadelphia",
            "country": "United States"
        }, customer: {
             "name": "Andrew Mead",
            "city": "Philadelphia",
            "email": "andrew123@gmail.com"
        }}),
      delete: jest.fn().mockReturnValue(1)
    }
  ));

// Create
describe('Orders-Controller-Create-method', () => {
    it('should return success with status with 200', async () => {
      const req = mockRequest({
        title: 'Title1',
        bookingDate: '07-04-2021',
        address: {
            street: "2694 Renwick Drive",
            zip: "19108",
            city: "Philadelphia",
            country: "United States"
        },
        customer: {
            name: "Andrew Mead",
            city: "Philadelphia",
            email: "andrew123@gmail.com"
        },
      });
      const res = mockResponse();
      get.mockImplementation(() => null);
      await ordersController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // GetAll
describe('Orders-Controller-GetAll-method', () => {
  it('should return success with status with 200', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await ordersController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// Get with Id
describe('Orders-Controller-Get-method', () => {
  it('should throw error reponse', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await ordersController.get(req, res);
    expect(res.send).toHaveBeenCalledWith({ code: 404, message: 'Orders not found for the given orders id: undefined' });
  });
  it('should return success', async () => {
    const req = mockRequest();
    const res = mockResponse();
    get.mockImplementation(() => [{  title: 'Title1',
    bookingDate: '07-04-2021',
    address: {
        street: "2694 Renwick Drive",
        zip: "19108",
        city: "Philadelphia",
        country: "United States"
    },
    customer: {
        name: "Andrew Mead",
        city: "Philadelphia",
        email: "andrew123@gmail.com"}}]);
    await ordersController.get(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// update
describe('Orders-Controller-update-method', () => {
  it('should throw error reponse', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await ordersController.update(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith({ code: 500, message: "Cannot read property 'title' of undefined" });
  });

  it('should return success', async () => {
    const req = mockRequest({
      title: 'Title1',
      bookingDate: '07-04-2021',
      address: {
          street: "2694 Renwick Drive",
          zip: "19108",
          city: "Philadelphia",
          country: "United States"
      },
      customer: {
          name: "Andrew Mead",
          city: "Philadelphia",
          email: "andrew123@gmail.com"
    }}, 'LMHJ7rivWZ8B58VBb8TD');
    const res = mockResponse();
    await ordersController.update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// delete
describe('Orders-Controller-delete-method', () => {
  it('should return success', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await ordersController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
