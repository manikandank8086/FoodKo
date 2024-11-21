import express from 'express'
import  * as adminDashboardController from '../../Backend/controller/adminDashboard.js'

const router = express.Router()


router.post('/addOrder',adminDashboardController.addOrder)

router.get('/orderDatais',adminDashboardController.getOrderDetails)

router.put('/orderDatais/:id',adminDashboardController.updateOrderData)

router.delete('/order/:orderId',adminDashboardController.deleteOrder)




export default router