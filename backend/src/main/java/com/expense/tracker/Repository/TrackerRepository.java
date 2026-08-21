package com.expense.tracker.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.expense.tracker.Entity.Tracker;

@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Long>{
	
	@Query("select COALESCE(SUM(t.amount), 0) from Tracker t")
	double getTotal();
	
	List<Tracker> findByCategory(String category);
	
	List<Tracker> findByPaymentMethod(String paymentMethod);
}
