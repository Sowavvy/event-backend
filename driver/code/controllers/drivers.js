import env from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import expandOrders from '../utils/expandOrders.js'
import validateOrderID from '../utils/validateOrderID.js';
import filterOrdersList from '../utils/filterOrdersList.js';

env.config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);


async function getAllDrivers(req, res) {
  const { data, error } = await supabase
    .from("drivers")
    .select();

  res.send(data);
}

async function getDriverById(req, res) {
  const { data, error } = await supabase
    .from("drivers")
    .select()
    .match({ id: req.params.id });

  res.send(data);
}

async function getDriverOrders(req, res) {
  const { data, error } = await supabase
    .from("orders")
    .select();

  res.send(data);
}

async function getDriverOrderById(req, res) {
  const { data } = await supabase
    .from("orders")
    .select()
    .match({ id: req.params.order_id });

  res.send(data);
}

async function acceptOrder(req, res) {
  const ORDER_ID = +req.params.order_id;

  const driver = (await supabase.from("drivers")
    .select()
    .match({ id: req.params.id })).data;

  const {acceptedOrders, declinedOrders, completedOrders} = expandOrders(driver[0].orders);

  await supabase
  .from('orders')
  .update({ driver_id: driver[0].id})
  .eq('id', ORDER_ID);

  const { data, error } = await supabase
    .from('drivers')
    .update({
      orders: {
        accepted: validateOrderID(acceptedOrders, ORDER_ID), 
        declined: filterOrdersList(declinedOrders, ORDER_ID),
        completed: filterOrdersList(completedOrders, ORDER_ID)
      }
    })
    .eq('id', req.params.id)
    .select();

  res.send(data)
}

async function declineOrder(req, res) {
  const ORDER_ID = +req.params.order_id;

  const driver = (await supabase
    .from("drivers")
    .select()
    .match({ id: req.params.id })).data;

  const {acceptedOrders, declinedOrders, completedOrders} = expandOrders(driver[0].orders);

  await supabase
  .from('orders')
  .update({ driver_id: null})
  .eq('id', ORDER_ID)

  const { data, error } = await supabase
    .from('drivers')
    .update({
      orders: {
        accepted: filterOrdersList(acceptedOrders, ORDER_ID), 
        declined: validateOrderID(declinedOrders, ORDER_ID),
        completed: filterOrdersList(completedOrders, ORDER_ID)
      }
    })
    .eq('id', req.params.id)
    .select();

  res.send(data)
}

async function completeOrder(req, res) {
  const ORDER_ID = +req.params.order_id;

  const driver = (await supabase
    .from("drivers")
    .select()
    .match({ id: req.params.id })).data;

  const {acceptedOrders, declinedOrders, completedOrders} = expandOrders(driver[0].orders);

  await supabase
  .from('orders')
  .update({ completed_at: new Date().toISOString()})
  .eq('id', ORDER_ID);

  const { data, error } = await supabase
    .from('drivers')
    .update({
      orders: {
        accepted: filterOrdersList(acceptedOrders, ORDER_ID), 
        declined: filterOrdersList(declinedOrders, ORDER_ID),
        completed: validateOrderID(completedOrders, ORDER_ID)
      }
    })
    .eq('id', req.params.id)
    .select();

  res.send(data)
}

async function cancelOrder(req, res) {
  const ORDER_ID = +req.params.order_id;

  const driver = (await supabase
    .from("drivers")
    .select()
    .match({ id: req.params.id })).data;

  const {acceptedOrders, declinedOrders, completedOrders} = expandOrders(driver[0].orders);

  await supabase
  .from('orders')
  .update({ driver_id: null})
  .eq('id', ORDER_ID);

  const { data, error } = await supabase
    .from('drivers')
    .update({
      orders: {
        accepted: filterOrdersList(acceptedOrders, ORDER_ID), 
        declined: filterOrdersList(declinedOrders, ORDER_ID),
        completed: filterOrdersList(completedOrders, ORDER_ID)
      }
    })
    .eq('id', req.params.id)
    .select();

  res.send(data)
}

async function deleteOrder(req, res) {
  const ORDER_ID = +req.params.order_id;

  const driver = (await supabase
    .from("drivers")
    .select()
    .match({ id: req.params.id })).data;

  const {acceptedOrders, declinedOrders, completedOrders} = expandOrders(driver[0].orders);

  await supabase
  .from('orders')
  .delete()
  .eq('id', ORDER_ID);

  const { data, error } = await supabase
    .from('drivers')
    .update({
      orders: {
        accepted: filterOrdersList(acceptedOrders, ORDER_ID), 
        declined: filterOrdersList(declinedOrders, ORDER_ID),
        completed: filterOrdersList(completedOrders, ORDER_ID)
      }
    })
    .eq('id', req.params.id)
    .select();

  res.send(data)
}

export { getAllDrivers, getDriverById, getDriverOrders, getDriverOrderById, acceptOrder, declineOrder, completeOrder, cancelOrder, deleteOrder }