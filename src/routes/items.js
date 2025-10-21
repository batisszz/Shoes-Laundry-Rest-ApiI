// src/routes/items.js
const express = require('express');
const supabase = require('../db/supabaseClient');
const router = express.Router();

/**
 * GET /api/items
 * optional query: status (e.g. ?status=Selesai)
 */
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let q = supabase.from('items').select('*').order('created_at', { ascending: false });

    if (status) {
      q = supabase.from('items').select('*').eq('status', status).order('created_at', { ascending: false });
    }

    const { data, error } = await q;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/items/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
    if (error) {
      // if not found supabase returns error.code or message - handle generically
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/items
 * body: { name, brand, owner_name, status (optional), note (optional) }
 * By default set date_in = now() and status = 'Dalam Proses' if not provided
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, brand, owner_name, status, note } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });

    const now = new Date().toISOString();
    const payload = {
      name,
      brand: brand || null,
      owner_name: owner_name || null,
      status: status || 'Dalam Proses',
      note: note || null,
      date_in: now,
      created_at: now,
      updated_at: now
    };

    const { data, error } = await supabase.from('items').insert(payload).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/items/:id
 * body: fields to update
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };

    const { data, error } = await supabase.from('items').update(updates).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/items/:id
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('items').delete().eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ deleted: true, item: data });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/items/:id/masuk
 * Set status='Masuk', set date_in = now()
 */
router.post('/:id/masuk', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {
      status: 'Masuk',
      date_in: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('items').update(updates).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Barang ditandai Masuk', item: data });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/items/:id/keluar
 * Set status='Keluar', set date_out = now()
 */
router.post('/:id/keluar', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {
      status: 'Keluar',
      date_out: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('items').update(updates).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Barang ditandai Keluar', item: data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
