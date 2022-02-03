package com.great_team.projects.avion.repository;


import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.great_team.projects.avion.entity.Avion;

@Repository
public interface AvionRepository extends JpaRepository<Avion,Long>{
	
	@Query("SELECT a FROM Avion a WHERE a.nomAvion=?1 and a.marque=?2 and a.capacite=?3 and a.ville=?4")
	public Optional<Avion> getAvion(String name, String marque, Integer capacite, String ville);

	@Query("SELECT a FROM Avion a WHERE a.nomAvion=?1 and a.marque=?2 and a.capacite=?3 and a.ville=?4 and a.numAvion!=?5")
	public ArrayList<Avion> getOtherAvion(String name, String marque, Integer capacite, String ville, Long numAvion);
	
	@Query(value = "SELECT DISTINCT * FROM avion a LEFT JOIN  vol v ON a.num_avion= v.num_avion WHERE v.num_avion IS NULL OR "
			+ "	(DATEDIFF(DATE(v.date_vol),NOW())< 0 AND v.num_avion NOT IN (SELECT v.num_avion FROM vol v WHERE  DATEDIFF(DATE(v.date_vol),NOW())> 0 ))", nativeQuery = true)
	public ArrayList<Avion> getAvailabaleAvion();
	

}