import * as Yup from 'yup';

/* eslint-disable-next-line */
const emailRules = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// -- registration rules --
const registerSchema = Yup.object().shape({
    nama_lengkap: Yup.string()
        .required(' ')
        .max(40, 'maksimal 40 karakter'),
    username: Yup.string()
        .required(' ')
        .min(8, 'minimal 8 karakter')
        .max(20, 'maksimal 20 karakter'),
    email: Yup.string()
        .required(' ')
        .email('email tidak valid'),
    password: Yup.string()
        .required(' ')
        .min(8, 'minimal 8 karakter')
        .max(20, 'maksimal 20 karakter'),
    notelp: Yup.string()
        .required(' ')
        .max(14, 'maksimal 14 character')
        .matches(/^\d+$/, 'nomor tidak valid'),
    nik: Yup.string()
        .required(' ')
        .max(16, 'masukan nik yang valid')
        .min(16, 'masukan nik yang valid')
        .matches(/^\d+$/, 'nik tidak valid'),
    tgl_lahir: Yup.string()
        .required(' '),
    kelamin: Yup.string()
        .required(' '),
    rt: Yup.string()
        .required(' ')
        .max(3, 'maksimal 3 character')
        .min(3, 'minimal 3 character')
        .matches(/^\d+$/, 'hanya boleh angka'),
    rw: Yup.string()
        .required(' ')
        .max(3, 'maksimal 3 character')
        .min(3, 'minimal 3 character')
        .matches(/^\d+$/, 'hanya boleh angka'),
    alamat: Yup.string()
        .required(' ')
        .max(255, 'maksimal 255 karakter'),
    kodepos: Yup.string().required(' ')
});

// -- edit profile rules --
const profileSchema = Yup.object().shape({
    nama_lengkap: Yup.string()
        .required(' ')
        .max(40, 'maksimal 40 karakter'),
    username: Yup.string()
        .required(' ')
        .min(8, 'minimal 8 karakter')
        .max(20, 'maksimal 20 karakter'),
    email: Yup.string()
        .required(' ')
        .email('email tidak valid'),
    // password: Yup.string()
    //     .required(' ')
    //     .min(8, 'minimal 8 karakter')
    //     .max(20, 'maksimal 20 karakter'),
    notelp: Yup.string()
        .required(' ')
        .max(14, 'maksimal 14 character')
        .matches(/^\d+$/, 'nomor tidak valid'),
    tgl_lahir: Yup.string()
        .required(' '),
    kelamin: Yup.string()
        .required(' '),
    alamat: Yup.string()
        .required(' ')
        .max(255, 'maksimal 255 karakter'),
});

export {
    registerSchema,
    profileSchema
};