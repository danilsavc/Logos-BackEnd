import ItemModel from "../models/Item.js";

export const getAll = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    results.countPage = Math.ceil((await ItemModel.countDocuments()) / limit);
    results.countItems = await ItemModel.countDocuments();
    if (endIndex < (await ItemModel.countDocuments().exec())) {
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
    results.results = await ItemModel.find().limit(limit).skip(startIndex).exec();
    res.paginatedResults = results;

    res.json(results);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось отримати блюдо",
    });
  }
};

export const getAllbyCategory = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    if (endIndex < (await ItemModel.countDocuments().exec())) {
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

    const itemCategory = req.params.categoryId;

    results.results = await ItemModel.find({
      category: itemCategory,
    })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.paginatedResults = results;

    results.countPage = Math.ceil(
      (await ItemModel.find({
        category: itemCategory,
      }).countDocuments()) / limit
    );

    results.countItems = await ItemModel.countDocuments();

    res.json(results);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось отримати блюдо",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const itemId = req.params.id;

    ItemModel.findOne(
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

export const remove = async (req, res) => {
  try {
    const itemId = req.params.id;

    ItemModel.findOneAndDelete(
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

export const create = async (req, res) => {
  try {
    const doc = new ItemModel({
      title: req.body.title,
      text: req.body.text,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      weight: req.body.weight,
      category: req.body.category,
      user: req.userId,
    });

    const item = await doc.save();

    res.json(item);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось створити блюдо",
    });
  }
};

export const update = async (req, res) => {
  try {
    const itemId = req.params.id;
    await ItemModel.updateOne(
      {
        _id: itemId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        weight: req.body.weight,
        category: req.body.category,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось створити блюдо",
    });
  }
};
