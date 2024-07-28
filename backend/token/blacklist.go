package token

import (
	"sync"
	"time"
)

type TokenBlacklist struct {
	mu    sync.Mutex
	store map[string]time.Time
}

var blacklist = &TokenBlacklist{
	store: make(map[string]time.Time),
}

func (b *TokenBlacklist) Add(token string, expiration time.Time) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.store[token] = expiration
}

func (b *TokenBlacklist) IsBlacklisted(token string) bool {
	b.mu.Lock()
	defer b.mu.Unlock()
	expiration, exists := b.store[token]
	if !exists {
		return false
	}
	return expiration.After(time.Now())
}

func GetBlacklist() *TokenBlacklist {
	return blacklist
}
