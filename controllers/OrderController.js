import OrderModel from "../models/Order.js";

export const orderCreate = async (req, res) => {
  try {
    const doc = new OrderModel({
      delivery: req.body.delivery,
      pay: req.body.pay,
      paid: req.body.paid,
      deliveryTime: req.body.deliveryTime,
      amountPers: req.body.amountPers,
      call: req.body.call,
      item: req.body.item,
      firstName: req.body.firstName,
      numberOrder: req.body.numberOrder,
      phone: req.body.phone,
      adress: req.body.adress,
    });

    const item = await doc.save();

    res.json(item);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось додати блюдо в замовлення",
    });
  }
};

export const getAllOrder = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    results.countPage = Math.ceil((await OrderModel.countDocuments()) / limit);
    results.countItems = await OrderModel.countDocuments();
    if (endIndex < (await OrderModel.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = await OrderModel.find().limit(limit).skip(startIndex).exec();
    res.paginatedResults = results;

    res.json(results);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось отримати замовлення",
    });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const itemId = req.params.id;

    OrderModel.findOneAndDelete(
      {
        _id: itemId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Не вдалось видалити блюдо",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Блюдо не знайдено",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось отримати блюдо",
    });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const itemId = req.params.id;

    OrderModel.findOne(
      {
        _id: itemId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Не вдалось отримати блюдо",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Блюдо не знайдено",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось отримати блюдо",
    });
  }
};
