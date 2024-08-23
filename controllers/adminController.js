import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import nanoid from '../utils/nanoid.js';

export const signupAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            id: nanoid(),
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Other CRUD functions...

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error });
    }
};

export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin', error });
    }
};

export const updateAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const updatedData = {
            username: username || admin.username,
            email: email || admin.email,
        };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        await Admin.update(updatedData, { where: { id } });

        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error });
    }
};

export const deleteAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        await Admin.destroy({ where: { id } });

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
};

export const deleteAllAdmins = async (req, res) => {
    try {
        await Admin.destroy({ where: {}, truncate: true });
        res.status(200).json({ message: 'All admins deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admins', error });
    }
};
