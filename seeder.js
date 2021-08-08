const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Bootcamp = require('./models/Bootcamp');

dotenv.config({ path: './config/config.env' });

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

const importBootcamps = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Bootcamps Imported...'.green.inverse);
    } catch (err) {
        console.error(err);
    }
    process.exit();
}

const deleteBootcamps = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Bootcamps Destroyed...'.red.inverse);
    } catch (err) {
        console.error(err);
    }
    process.exit();
}

if (process.argv[2] === '-i') {
    importBootcamps();
} else if (process.argv[2] === '-d') {
    deleteBootcamps();
}