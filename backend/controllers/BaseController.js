export class BaseController {
    constructor(model) {
      this.model = model;
    }
  
    async getAll(req, res) {
      try {
        const items = await this.model.find();
        res.json(items);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async getById(req, res) {
      try {
        const item = await this.model.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }