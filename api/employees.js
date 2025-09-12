import express from "express";
const router = express.Router();
export default router;
import {
  deleteEmployee,
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
} from "../db/queries/employees.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const response = await getEmployees();
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    const { name, birthday, salary } = req.body;
    if (!req.body || !name || !birthday || salary == null) {
      return res.status(400).send("Missing required field");
    }
    try {
      const response = await createEmployee({ name, birthday, salary });
      res.status(201).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).send("Invalid ID");
    try {
      const response = await getEmployee(id);
      if (!employee) return res.status(404).send("Employee does not exist");
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(async (req, res) => {
    try {
      const { name, birthday, salary } = req.body;
      const response = await updateEmployee({ name, birthday, salary });
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.body;
      const response = await deleteEmployee(id);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  });
