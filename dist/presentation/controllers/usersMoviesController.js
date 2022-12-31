"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersMoviesRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const UpdateMovieInUserListUseCase_1 = require("../../core/useCases/users_movies/UpdateMovieInUserListUseCase");
const AddMovieToUserListUseCase_1 = require("../../core/useCases/users_movies/AddMovieToUserListUseCase");
const IndexMoviesInUserListUseCase_1 = require("../../core/useCases/users_movies/IndexMoviesInUserListUseCase");
const checkAuthentication_1 = require("../../presentation/middlewares/checkAuthentication");
const DeleteMovieFromUserListUseCase_1 = require("../../core/useCases/users_movies/DeleteMovieFromUserListUseCase");
const FindOneMovieInUserListUseCase_1 = require("../../core/useCases/users_movies/FindOneMovieInUserListUseCase");
const formatStringData_1 = require("../helpers/formatStringData");
const usersMoviesRoutes = (0, express_1.Router)();
exports.usersMoviesRoutes = usersMoviesRoutes;
usersMoviesRoutes.post('/:id', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        userId: req.usuario.id,
        movieId: req.params.id,
    };
    const createUserUseCase = tsyringe_1.container.resolve(AddMovieToUserListUseCase_1.AddMovieToUserListUseCase);
    const response = yield createUserUseCase.execute(data);
    return res.status(201).json(response);
}));
usersMoviesRoutes.put('/:id', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watched, favorite, rating } = req.body;
    const data = {
        userId: req.usuario.id,
        movieId: req.params.id,
        watched,
        favorite,
        rating,
    };
    const updateMovieInUserListUseCase = tsyringe_1.container.resolve(UpdateMovieInUserListUseCase_1.UpdateMovieInUserListUseCase);
    const movieUpdatedInList = yield updateMovieInUserListUseCase.execute(data);
    return res.status(201).json(movieUpdatedInList);
}));
usersMoviesRoutes.delete('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        userId: req.usuario.id,
        movieId: req.query.movieId,
    };
    const createUserUseCase = tsyringe_1.container.resolve(DeleteMovieFromUserListUseCase_1.DeleteMovieFromUserListUseCase);
    yield createUserUseCase.execute(data);
    return res.status(201).send();
}));
usersMoviesRoutes.get('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const indexMovieInUserListUseCase = tsyringe_1.container.resolve(IndexMoviesInUserListUseCase_1.IndexMoviesInUserListUseCase);
    const data = {
        userId: req.usuario.id,
        watched: req.query.watched,
        favorite: (0, formatStringData_1.formatStringData)(req.query.favorite),
    };
    const userMovies = yield indexMovieInUserListUseCase.execute(data);
    return res.status(201).json(userMovies);
}));
usersMoviesRoutes.get('/:id', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUserUseCase = tsyringe_1.container.resolve(FindOneMovieInUserListUseCase_1.FindOneMoviesInUserListUseCase);
    const data = {
        userId: req.usuario.id,
        movieId: req.params.id,
    };
    const userMovies = yield findUserUseCase.execute(data);
    return res.status(201).json(userMovies);
}));
