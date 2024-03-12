use axum::{routing::get, Router};
use std::sync::Arc;

#[derive(Debug, Clone)]
struct User {
    id: i32,
    username: String,
    email: String,
}

#[tokio::main]
async fn main() {
    let users: Arc<Vec<User>> = Arc::new(Vec::new());

    let app = Router::new()
        .route("/users/:id", get(get_user))
        .route("/users", get(list_users));

    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn list_users(users: axum::extract::Extension<Arc<Vec<User>>>) -> String {
    format!("{:?}", *users)
}

async fn get_user(
    id: axum::extract::Path<i32>,
    users: axum::extract::Extension<Arc<Vec<User>>>,
) -> String {
    let user = users.iter().find(|&u| u.id == *id);
    match user {
        Some(user) => format!("{:?}", user),
        None => "User not found".to_string(),
    }
}

