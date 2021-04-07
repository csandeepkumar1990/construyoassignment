const OrdersService = require('../../services/orders.service');
let createdId = null;

describe('Orders-Services', () => {
  // create
  it('should create new orders', async () => {
    const orders = await OrdersService.create({
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
    createdId = orders.newDocId;
    expect(orders.data.title).toEqual('Title1');
  });

   // getAll
   it('should get all orders', async () => {
    const orders = await OrdersService.getAll(1, 10);
    expect(orders).toBeTruthy();
  });

  // get
  it('should get orders with a id', async () => {
    const orders = await OrdersService.get(createdId);
    expect(orders.title).toEqual('Title1');
  });

  // update
  it('should update a order', async () => {
    const orders = await OrdersService.update({
      title: 'Title1'
    }, createdId);
    expect(orders.data.title).toEqual('Title1');
  });

  // delete
  it('should delete a order', async () => {
    const orders = await OrdersService.delete(createdId);
    expect(orders).toBeTruthy();
  });

});

