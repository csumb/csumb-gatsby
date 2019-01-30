workflow "Deployment complete" {
  on = "deployment"
  resolves = ["GitHub Action for Slack"]
}

action "GitHub Action for Slack" {
  uses = "Ilshidur/action-slack@5b3a58f5e0ff655ca9c17a22516efdf9d0de36bf"
  secrets = ["SLACK_WEBHOOK"]
}
