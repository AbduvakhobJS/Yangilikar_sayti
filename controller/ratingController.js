// const RatingModel = require('../model/ratingModel')
// const newsModel = require('../model/newsModel')
// const mongoose = require('mongoose')

// //@description: malumot yaratish
// //@api: /api/rating/create
// //@Method: POST

exports.createRating = async (req, res, next) => {
    const { rating, news_ID } = req.body;
    const result = new RatingModel({
        rating: rating,
        news_ID: news_ID
    })
    await result.save()
        .then(() => {


            const countRatingNews = await RatingModel.aggregate([
                {
                    $match: {
                        news_ID: mongoose.Types.ObjectId(news_ID)
                    }
                },
                {
                    $group: {
                        _id: "$news_ID",
                        count: {$sum: 1}
                    }
                },
                {
                    $project: {
                        _id: 1,
                        count: 1,
                        totalSum: {
                            $round: [
                                {
                                    $divide: [
                                        "$totalSum", "$count"
                                    ]
                                },
                                1
                            ]
                        }
                    }
                }
            ])
            const updateRating = await newsModel.findByIdAndUpdate(news_ID)
            if(countRatingNews == "") {
                updateRating.rating = rating
            }
            else {
                updateRating.rating = countRatingNews[0].totalSum
            }
            await updateRating.save()
            res.json(result)


        })
        .catch((error))
}
